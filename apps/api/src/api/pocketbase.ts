import {
    API_ITEM_COLLECTION_DEFAULT_FILTERS,
    API_ITEM_COLLECTION_RECORDS_URL,
    API_SNAPSHOT_COLLECTION_RECORDS_URL, API_SNAPSHOT_PRICE_COLLECTION_RECORDS_URL
} from "../env.js";
import type {Item, Order, PocketbaseResponse, Snapshot} from "../types.js";

export async function getPocketbaseItems(): Promise<Item[]> {
    const res = await fetch(`${API_ITEM_COLLECTION_RECORDS_URL}${API_ITEM_COLLECTION_DEFAULT_FILTERS}`);
    const json: PocketbaseResponse = await res.json();
    return json.items;
}

export async function recordMarketSnapshot(item: Item, orders: Order[]) {
    let averagePrice = 0;
    let minPrice = 1e39;
    let medianPrice = 0;

    if (orders && orders.length > 0) {
        for (const order of orders) {
            averagePrice += order.platinum;
            if (order.platinum < minPrice) {
                minPrice = order.platinum;
            }
        }
        averagePrice /= orders.length;
        medianPrice = orders[Math.floor(orders.length / 2)]!.platinum;
    }

    const snapshotData = {
        item: item.id,
        date: new Date(),
        average_price: averagePrice,
        min_price: minPrice,
        median_price: medianPrice,
    };
    const snapshot: Snapshot = await createSnapshot(snapshotData);
    createOrders(snapshot, orders);
}

async function createSnapshot(snapshotData: object): Promise<Snapshot> {
    const res = await fetch(API_SNAPSHOT_COLLECTION_RECORDS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(snapshotData),
    });
    if (res.status != 200) {
        console.error(`Failed creating snapshot with data ${snapshotData}`);
        console.error(await res.json());
    }
    return await res.json();
}

async function createOrders(snapshot: Snapshot, orders: Order[]) {
    for (const order of orders) {
        const orderData = {
            snapshot: snapshot.id,
            username: order.user.ingame_name,
            price: order.platinum,
        };
        await createOrder(orderData);
    }
}

async function createOrder(orderData: object) {
    const res = await fetch(API_SNAPSHOT_PRICE_COLLECTION_RECORDS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    });
    if (res.status != 200) {
        console.error(`Failed creating order with data ${orderData}`);
        console.error(await res.json());
    }
}
