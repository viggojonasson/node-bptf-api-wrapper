import BPTFApiWrapper from '..';
import { BuyListing, SellListing } from '../types/listings';
import {
    ClassifiedSearchParams,
    CreateListingsResponse,
    DeleteListingsResponse,
    MyListingsResponse,
    SearchListingsResponse,
} from '../types/responses';

export default class Listings {
    private readonly wrapper: BPTFApiWrapper;

    constructor(wrapper: BPTFApiWrapper) {
        this.wrapper = wrapper;
    }

    searchListings(
        parameters: ClassifiedSearchParams
    ): Promise<SearchListingsResponse> {
        return this.wrapper.makeRequest(
            parameters,
            'GET',
            'classifieds/search/v1'
        );
    }

    createListings(
        listings: (SellListing | BuyListing)[]
    ): Promise<CreateListingsResponse> {
        return this.wrapper.makeRequest(
            { listings: listings },
            'POST',
            'classifieds/list/v1',
            true
        );
    }

    deleteListings(ids: string[]): Promise<DeleteListingsResponse> {
        return this.wrapper.makeRequest(
            { listing_ids: ids },
            'DELETE',
            'classifieds/delete/v1',
            true
        );
    }

    // Automatic parameter does not work. still.
    sendHeartbeat(): Promise<{ bumped: number }> {
        return this.wrapper.makeRequest({}, 'POST', 'aux/heartbeat/v1');
    }

    getMyListings(): Promise<MyListingsResponse> {
        return this.wrapper.makeRequest({}, 'GET', 'classifieds/listings/v1');
    }
}
