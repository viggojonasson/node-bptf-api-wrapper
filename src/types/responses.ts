import { BuyListing, SellListing } from './listings';

export interface ClassifiedSearchParams {
    page_size?: number;
    item?: string;
    quality?: number;
    killstreak_tier?: number;
    australium?: number;
    craftable?: number;
    particle?: string;
}

export type PossibleParams = ClassifiedSearchParams & {
    key?: string;
    token?: string;

    // This is for heartbeat but it doesn't even do anything.
    automatic?: 'sell' | 'all';

    // Alert
    item_name?: string;
    max?: number;
    min?: number;
    currency?: 'keys' | 'metal';
    intent?: 'sell' | 'buy';
    blanket?: 0 | 1;

    // Alert getting
    skip?: number;

    // Notifications
    unread?: number;

    // Listings
    listing_ids?: string[];
    listings?: any[];
};

export interface DeleteListingsResponse {
    deleted: number;
    errors: {
        listing_id: string;
        message: string;
    }[];
}

export interface CreateListingsResponse {
    listings: {
        [item: string]: {
            created?: 1;
            error?: string;
            retry?: number;
        };
    };
}

export interface BPTFAlert {
    id: string;
    item_name: string;
    intent: 'sell' | 'buy';
    appid: number;
    steamid: string;
    price: {
        currency: 'keys' | 'metal';
        min: number;
        max: number;
    };
}

export interface BPTFNotification {
    id: string;
    steamid: string;
    bundle: {
        listing?: SellListing | BuyListing;
    };
}

export interface GetNotficiationsResponse {
    results: BPTFNotification[];
    cursor: {
        skip: number;
        total: number;
        limit: number;
    };
}

export interface GetAlertsResponse {
    results: BPTFAlert[];
    cursor: {
        skip: number;
        limit: number;
        total: number;
    };
}

export interface DeleteListingsResponse {
    deleted: number;
    errors: {
        listing_id: string;
        message: string;
    }[];
}

export interface SearchListingsResponse {
    total: number;
    skip: number;
    page_size: number;
    buy: {
        total: number;
        listings: BuyListing[];
    };
    sell: {
        total: number;
        listings: SellListing[];
    };
}

export interface MyListingsResponse {
    cap: number;
    promotes_remaining: number;
    listings: (SellListing | BuyListing)[];
}
