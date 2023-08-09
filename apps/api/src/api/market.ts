import {WARFRAME_MARKET_API_SEARCH_URL} from "../env.js";
import type {MarketResponse, Order} from "../types.js";

export async function getMarketOrders(itemName: string): Promise<Order[]> {
    const url = buildMarketUrl(itemName);
    const res = await fetch(url);
    const json: MarketResponse = await res.json();
    return json.payload.orders;
}

export async function getAndFilterMarketOrders(itemName: string): Promise<Order[]> {
    let orders: Order[] = await getMarketOrders(itemName);
    orders = filterByLastSeen(orders, 3);
    orders = filterBySellOrder(orders);
    orders = orderByPrice(orders);
    orders = getTopN(orders, 20);
    return orders;
}

export function filterOnlineUsers(orders: Order[]): Order[] {
    return orders.filter(order => order.user.status === "ingame");
}

export function orderByPrice(orders: Order[]): Order[] {
    return orders.sort((a, b) => a.platinum - b.platinum);
}

export function getTopN(orders: Order[], n: number): Order[] {
    return orders.slice(0, n);
}

export function filterByLastSeen(orders: Order[], ageInDays: number) {
    const thresh = new Date();
    thresh.setDate(thresh.getDate() - ageInDays);
    return orders.filter(order => new Date(order.user.last_seen) > thresh);
}

export function filterBySellOrder(orders: Order[]): Order[] {
    return orders.filter(order => order.order_type === "sell");
}

function buildMarketUrl(itemName: string): string {
    return WARFRAME_MARKET_API_SEARCH_URL.replace("$item", itemName);
}
