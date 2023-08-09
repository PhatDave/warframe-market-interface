export type Item = {
    name: string;
    display_name: string;
    id: string;
}

export type Snapshot = {
    id: string;
    item: string;
    date: Date;
    averagePrice: number;
    minPrice: number;
    medianPrice: number;
}

export type Price = {
    id: string;
    item: string;
    snapshot: string;
    username: string;
}

// Warframe market

export type MarketResponse = {
    payload: Payload;
}

export type Payload = {
    orders: Order[];
}

export type Order = {
    visible: boolean;
    creation_date: string;
    order_type: string;
    last_update: string;
    platinum: number;
    user: User;
    quantity: number;
    platform: string;
    id: string;
    mod_rank: number;
    region: string;
}

export type User = {
  reputation: number;
  locale: string;
  last_seen: string;
  ingame_name: string;
  id: string;
  region: string;
  status: string;
}

// Pocketbase

export type PocketbaseResponse = {
    items: Item[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
}
