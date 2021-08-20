import BPTFApiWrapper from '..';
import { BPTFAlert, GetAlertsResponse } from '../types/responses';

export default class Alerts {
    private readonly wrapper: BPTFApiWrapper;

    constructor(wrapper: BPTFApiWrapper) {
        this.wrapper = wrapper;
    }

    deleteAlert(itemName: string, intent: 'sell' | 'buy'): Promise<void> {
        return this.wrapper.makeRequest(
            { item_name: itemName, intent },
            'DELETE',
            'classifieds/alerts'
        );
    }

    getAlerts(skip = 0): Promise<GetAlertsResponse> {
        return this.wrapper.makeRequest({ skip }, 'GET', 'classifieds/alerts');
    }

    createAlert(
        itemName: string,
        intent: 'sell' | 'buy',
        currency: 'keys' | 'metal',
        min: number,
        max: number,
        blanket: 0 | 1 = 0
    ): Promise<BPTFAlert> {
        return this.wrapper.makeRequest(
            {
                item_name: itemName,
                intent,
                min,
                max,
                blanket,
                currency,
            },
            'POST',
            'classifieds/alerts'
        );
    }
}
