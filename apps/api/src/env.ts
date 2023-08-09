export const WARFRAME_MARKET_AIP_URL = "https://api.warframe.market/v1";
export const WARFRAME_MARKET_API_SEARCH_URL = `${WARFRAME_MARKET_AIP_URL}/items/$item/orders`;

export const API_URL = "https://pocketbase-warframe-market.site.quack-lab.dev";

export const API_ITEM_COLLECTION = "item";
export const API_ITEM_COLLECTION_URL = `${API_URL}/api/collections/${API_ITEM_COLLECTION}`;
export const API_ITEM_COLLECTION_RECORDS_URL = `${API_ITEM_COLLECTION_URL}/records`;
export const API_ITEM_COLLECTION_DEFAULT_FILTERS = `?fields=name,display_name,id&sort=-created&perPage=1000`;

export const API_SNAPSHOT_COLLECTION = "price_snapshot";
export const API_SNAPSHOT_COLLECTION_URL = `${API_URL}/api/collections/${API_SNAPSHOT_COLLECTION}`;
export const API_SNAPSHOT_COLLECTION_RECORDS_URL = `${API_SNAPSHOT_COLLECTION_URL}/records`;

export const API_SNAPSHOT_PRICE_COLLECTION = "price";
export const API_SNAPSHOT_PRICE_COLLECTION_URL = `${API_URL}/api/collections/${API_SNAPSHOT_PRICE_COLLECTION}`;
export const API_SNAPSHOT_PRICE_COLLECTION_RECORDS_URL = `${API_SNAPSHOT_PRICE_COLLECTION_URL}/records`;
