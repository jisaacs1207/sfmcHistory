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

});