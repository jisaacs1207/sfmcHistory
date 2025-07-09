# SFMC Email History Lightning Web Component

This Salesforce DX project contains the `sfmcHistoryList` Lightning Web Component (LWC), which displays a list of sent Marketing Cloud emails for a Contact record. The component retrieves email history using an Apex class and allows users to view email details in a modal dialog.

## Features
- Button to load or refresh Marketing Cloud email history for a Contact
- Table view of sent emails with subject and date
- Clickable subject to view email content in a modal (iframe)
- Error handling with toast notifications and inline error messages

## Structure
- `force-app/main/default/lwc/sfmcHistoryList/` — Main LWC component
- `force-app/main/default/classes/SFMCEmailHistoryService.cls` — Apex service for fetching email history

## Usage
1. Deploy the LWC and Apex class to your Salesforce org.
2. Add the `sfmcHistoryList` component to a Contact record page in Lightning App Builder.
3. Click "Load Emails" to view the email history for the Contact's email address.

## Development
- To run tests: see `__tests__/sfmcHistoryList.test.js` inside the LWC folder.
- Update the Apex class as needed to match your Marketing Cloud integration.

## Requirements
- Salesforce DX
- Access to Marketing Cloud email data via Apex

## License
MIT
