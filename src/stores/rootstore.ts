import { observable } from "mobx";
import { createItems, DEFAULT_PAGE_SIZE, Product } from "../helper";
import { CartStore } from "./cartstore";
import { OrdersStore } from "./ordersstore";
import { ShoppingStore } from "./shoppingstore";


export class RootStore {
    shoppingStore: ShoppingStore;

    cartStore: CartStore;

    ordersStore: OrdersStore;

    items: Product[];

    constructor() {     
        this.shoppingStore = new ShoppingStore(this);
        this.cartStore = new CartStore(this);
        this.ordersStore = new OrdersStore(this);
        this.items = observable(createItems(DEFAULT_PAGE_SIZE));
    }    

    getitems = (limit: number) => {
        const newItems = createItems(limit);
        this.items = observable([...this.items, ...newItems])
    }     
}