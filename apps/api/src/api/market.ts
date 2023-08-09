import {DEFAULT_GET_OPTIONS, WARFRAME_MARKET_API_SEARCH_URL, WARFRAME_MARKET_API_STATISTICS_URL} from "../env.js";
import type {MarketOrderResponse, MarketStatisticsResponse, Order, Statistics48hours} from "../types.js";

export async function getMarketOrders(itemName: string): Promise<Order[]> {
    const url = buildMarketUrl(itemName);
    const res = await fetch(url, DEFAULT_GET_OPTIONS);
    if (res.status != 200) {
        console.error(`Failed fetching orders for item ${itemName}`);
        console.error(await res.json());
    }
    const json: MarketOrderResponse = await res.json();
    return json.payload.orders;
}

export async function getAndFilterMarketOrders(itemName: string): Promise<Order[]> {
    let orders: Order[] = await getMarketOrders(itemName);
    orders = ordersFilterByLastSeen(orders, 3);
    orders = ordersFilterBySellOrder(orders);
    orders = ordersOrderByPrice(orders);
    orders = ordersGetTopN(orders, 20);
    return orders;
}

function buildMarketUrl(itemName: string): string {
    return WARFRAME_MARKET_API_SEARCH_URL.replace("$item", itemName);
}

export function ordersFilterOnlineUsers(orders: Order[]): Order[] {
    return orders.filter(order => order.user.status === "ingame");
}

export function ordersOrderByPrice(orders: Order[]): Order[] {
    return orders.sort((a, b) => a.platinum - b.platinum);
}

export function ordersGetTopN(orders: Order[], n: number): Order[] {
    return orders.slice(0, n);
}

export function ordersFilterByLastSeen(orders: Order[], ageInDays: number) {
    const thresh = new Date();
    thresh.setDate(thresh.getDate() - ageInDays);
    return orders.filter(order => new Date(order.user.last_seen) > thresh);
}

export function ordersFilterBySellOrder(orders: Order[]): Order[] {
    return orders.filter(order => order.order_type === "sell");
}

export async function getMarketStatistics(itemName: string): Promise<Statistics48hours[]> {
    const url = buildMarketStatisticsUrl(itemName);
    const res = await fetch(url, DEFAULT_GET_OPTIONS);
    if (res.status != 200) {
        console.error(`Failed fetching market statistics for ${itemName}`);
        console.error(await res.json());
    }
    const json: MarketStatisticsResponse = await res.json();
    return json.payload.statistics_live["48hours"];
}

export async function getAndFilterMarketStatistics(itemName: string): Promise<Statistics48hours[]> {
    let statistics = await getMarketStatistics(itemName);
    statistics = statisticsFilterBySellOrder(statistics);
    statistics = statisticsOrderByDate(statistics);
    statistics = statisticsFilterByModRank(statistics, 0);
    return statistics;
}

export function statisticsFilterBySellOrder(statistics: Statistics48hours[]): Statistics48hours[] {
    return statistics.filter(statistic => statistic.order_type === "sell");
}

export function statisticsOrderByDate(statistics: Statistics48hours[]): Statistics48hours[] {
    return statistics.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
}

export function statisticsFilterByModRank(statistics: Statistics48hours[], rank: number): Statistics48hours[] {
    return statistics.filter(statistic => statistic.mod_rank === rank);
}

function buildMarketStatisticsUrl(itemname: string) {
    return WARFRAME_MARKET_API_STATISTICS_URL.replace("$item", itemname);
}
