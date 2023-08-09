export type Item = {
    id?: string;
    name: string;
    display_name: string;
}

export type Snapshot = {
    id?: string;
    item: string;
    date: Date;
    average_price: number;
    min_price: number;
    median_price: number;
    average_volume: number;
    median_volume: number;
}

export type Price = {
    id?: string;
    item: string;
    snapshot: string;
    username: string;
}

// Market orders

export type MarketOrderResponse = {
    payload: OrdersPayload;
}

export type OrdersPayload = {
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

// Market Statistics

export type MarketStatisticsResponse = {
    payload: StatisticsPayload;
}

export type StatisticsPayload = {
  statistics_live: Statistics;
}

export type Statistics = {
    "48hours": Statistics48hours[];
}

export type Statistics48hours = {
    datetime: string;
    volume: number;
    min_price: number;
    max_price: number;
    avg_price: number;
    wa_price: number;
    median: number;
    order_type: string;
    id: string;
    mod_rank: number;
}

// Pocketbase

export type PocketbaseResponse = {
    items: Item[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
}
