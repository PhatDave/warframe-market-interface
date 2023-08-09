import {getAndFilterMarketOrders} from "./api/market.js";
import {getPocketbaseItems, recordMarketSnapshot} from "./api/pocketbase.js";
import type {Order} from "./types.js";

async function main() {
    const items = await getPocketbaseItems();
    console.log(items);
    for (const item of items) {
        const orders: Order[] = await getAndFilterMarketOrders(item.name);
        recordMarketSnapshot(item, orders);
    }
}

main();
