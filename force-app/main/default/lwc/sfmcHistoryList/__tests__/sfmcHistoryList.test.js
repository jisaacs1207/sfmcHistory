import { createElement } from '@lwc/engine-dom';
import SfmcHistoryList from 'c/sfmcHistoryList';

describe('c-sfmc-history-list', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders Load Emails button and no table initially', () => {
        const element = createElement('c-sfmc-history-list', {
            is: SfmcHistoryList
        });
        document.body.appendChild(element);
        const button = element.shadowRoot.querySelector('lightning-button');
        expect(button).not.toBeNull();
        const table = element.shadowRoot.querySelector('table');
        expect(table).toBeNull();
    });

    it('shows table after loading emails (mock)', async () => {
        const element = createElement('c-sfmc-history-list', {
            is: SfmcHistoryList
        });
        document.body.appendChild(element);
        element.emails = [
            { SubjectLine: 'Test', CreatedDate: '2025-07-09', EmailAddress: 'foo@bar.com', EmailWebURL: 'https://example.com', EventType: 'Sent', ChannelType: 'Email' }
        ];
        await Promise.resolve();
        await Promise.resolve();
        element.loading = false;
        await Promise.resolve();
        const table = element.shadowRoot.querySelector('table');
        expect(table).not.toBeNull();
        expect(table.querySelectorAll('tr').length).toBeGreaterThan(1); // header + row
    });

    it('shows modal when subject link clicked', async () => {
        const element = createElement('c-sfmc-history-list', {
            is: SfmcHistoryList
        });
        document.body.appendChild(element);
        element.emails = [
            { SubjectLine: 'Test', CreatedDate: '2025-07-09', EmailAddress: 'foo@bar.com', EmailWebURL: 'https://example.com', EventType: 'Sent', ChannelType: 'Email' }
        ];
        await Promise.resolve();
        await Promise.resolve();
        element.loading = false;
        await Promise.resolve();
        const subjectLink = element.shadowRoot.querySelector('a.slds-text-link');
        expect(subjectLink).not.toBeNull();
        subjectLink.click();
        await Promise.resolve();
        expect(element.showModal).toBe(true);
        const modal = element.shadowRoot.querySelector('section.slds-modal');
        expect(modal).not.toBeNull();
    });
});