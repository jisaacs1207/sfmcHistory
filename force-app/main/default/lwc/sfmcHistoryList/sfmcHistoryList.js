import { LightningElement, api, wire, track } from 'lwc';
import getEmailHistory from '@salesforce/apex/SFMCEmailHistoryService.getEmailHistory';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';

const CONTACT_EMAIL_FIELD = 'Contact.Email';

export default class SfmcHistoryList extends LightningElement {
    @track iframeError = false;
    @api recordId;
    @api objectApiName;
    @track emails = [];
    @track loading = false;
    @track error;
    @track selectedEmail = null;
    @track showModal = false;

    emailAddress;

    

    get fields() {
        if (this.objectApiName === 'Contact') {
            return [CONTACT_EMAIL_FIELD];
        }
        return [];
    }

    @wire(getRecord, { recordId: '$recordId', fields: '$fields' })
    wiredRecord({ error, data }) {
        if (data && data.fields.Email) {
            this.emailAddress = data.fields.Email.value;
        } else if (error) {
            this.emailAddress = null;
            this.error = error;
            this.showError('Error retrieving email address.');
            // Optionally, log error to console for debugging
            // eslint-disable-next-line no-console
            console.error('wiredRecord error:', error);
        }
    }

    // Called by button click
    handleLoadEmails() {
        this.loading = true;
        this.error = undefined;
        this.selectedEmail = null;
        this.showModal = false;
        if (!this.emailAddress) {
            this.showError('No email address found on this record.');
            this.loading = false;
            return;
        }
        getEmailHistory({ emailAddress: this.emailAddress })
            .then(result => {
                this.emails = (result || []).filter(e => e.EventType === 'Sent' && e.ChannelType === 'Email');
                if (this.emails.length === 0) {
                    this.showError('No sent emails found for this address.');
                }
            })
            .catch(error => {
                this.error = error;
                this.showError('Error loading email history.');
            })
            .finally(() => {
                this.loading = false;
            });
    }

    get hasLoaded() {
        return this.emails.length > 0;
    }

    get loadButtonLabel() {
        return this.hasLoaded ? 'Refresh' : 'Load Emails';
    }

    get showInstructions() {
        return this.objectApiName === 'Contact' && !this.hasLoaded && !this.loading;
    }

    handleSubjectClick(event) {
        const idx = event.currentTarget.dataset.index;
        if (idx !== undefined && this.emails[idx]) {
            this.selectedEmail = this.emails[idx];
            this.showModal = true;
            this.iframeError = false; // Reset error when opening modal
        } else {
            this.showError('Invalid email selection.');
        }
    }

    handleIframeLoad() {
        this.iframeError = false;
    }

    handleIframeError() {
        this.iframeError = true;
    }

    openEmailUrlInNewTab() {
        if (this.selectedEmail && this.selectedEmail.EmailWebURL) {
            window.open(this.selectedEmail.EmailWebURL, '_blank');
        }
    }

    handleRefresh() {
        this.handleLoadEmails();
    }

    handleRowClick(event) {
        const idx = event.currentTarget.dataset.index;
        if (idx !== undefined && this.emails[idx]) {
            this.selectedEmail = this.emails[idx];
            this.showModal = true;
        } else {
            this.showError('Invalid email selection.');
        }
    }

    handleModalClose() {
        this.showModal = false;
        this.selectedEmail = null;
    }

    showError(message) {
        this.error = message;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message,
                variant: 'error',
            })
        );
    }
}