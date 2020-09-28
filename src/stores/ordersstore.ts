import { action, observable } from "mobx";
import { OrderProduct } from "../helper";
import { RootStore } from "./rootstore";


export class OrdersStore {

    rootstore: RootStore;

    @observable items: OrderProduct[];

    constructor( rootstore: RootStore) {
        this.rootstore = rootstore;
        this.items = observable([]);
    }

    @action addProduct = (product: OrderProduct) => {
        this.items.push(product);
    }

  }