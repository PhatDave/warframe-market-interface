import {getAndFilterMarketOrders, getAndFilterMarketStatistics} from "./api/market.js";
import {getPocketbaseItems, recordMarketSnapshot} from "./api/pocketbase.js";
import type {Order, Statistics48hours} from "./types.js";

async function main() {
    const items = await getPocketbaseItems();
    console.log(items);
    for (const item of items) {
        const orders: Order[] = await getAndFilterMarketOrders(item.name);
        const statistics: Statistics48hours[] = await getAndFilterMarketStatistics(item.name);
        console.log(statistics);
        recordMarketSnapshot(item, orders, statistics);
    }
}

main();
