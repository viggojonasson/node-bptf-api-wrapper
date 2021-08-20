import axios, { AxiosInstance } from 'axios';

import Listings from './subclasses/Listings';
import Alerts from './subclasses/Alerts';

import { PossibleParams } from './types/responses';

export function createUniqueSKU(sku: string): string {
    return sku.split(';')[1] + ';6';
}

export default class BPTFApiWrapper {
    private apiKey: string;

    private apiToken: string;

    private axiosInstance: AxiosInstance;

    public readonly listings: Listings;

    public readonly alerts: Alerts;

    constructor(apiKey: string, apiToken: string) {
        this.apiKey = apiKey;
        this.apiToken = apiToken;

        this.axiosInstance = axios.create({
            timeout: 10 * 1000,
            baseURL: 'https://backpack.tf/api/',
            params: {
                key: this.apiKey,
                token: this.apiToken,
            },
            data: {
                token: this.apiToken,
                key: this.apiKey,
            },
        });

        this.listings = new Listings(this);
        this.alerts = new Alerts(this);
    }

    makeRequest<T>(
        params: PossibleParams,
        method: 'GET' | 'DELETE' | 'POST',
        endpoint: string,
        data = false
    ): Promise<T> {
        const request: any = {
            method,
            url: `https://backpack.tf/api/${endpoint}`,
            params: params,
            timeout: 10 * 1000,
        };
        if (data) {
            delete request.params;
            request.data = params;
        }

        if (method === 'POST') request.body = params;

        return this.axiosInstance(request).then((res) => res.data);
    }
}
