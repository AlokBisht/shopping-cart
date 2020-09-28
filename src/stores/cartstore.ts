import { action, computed, observable } from "mobx";
import { CartProduct } from "../helper";
import { RootStore } from "./rootstore";


 export class CartStore {

    rootstore: RootStore;

    @observable items: CartProduct[];

    constructor(rootstore: RootStore) { 
        this.rootstore = rootstore;
        this.items = observable([]);
    }
    
    @action clearProducts = () => {
        this.items.length = 0;
    }

    @action addProduct = (id: String) => {
        const index = this.items.findIndex(i=> i.id === id);
        if(index > -1) {
            this.udpateProductQuantity(id, this.items[index].quantity + 1);
        } else {
            const item = this.rootstore.items.find(i=> i.id === id);
            if(item) {
                this.items.push({id: item.id, quantity: 1});
            }
        }
    }

    @action removeProduct = (id: String) => {
        const index = this.items.findIndex(i=> i.id === id);
        if(index > -1) {
            this.items.splice(index, 1);
        }
    }

    @action udpateProductQuantity = (id: String, newQuantity: number) => {
        const index = this.items.findIndex(i=> i.id === id);
        if(index > -1) {
            if(newQuantity < 1) {
                this.items.splice(index, 1);
            } else {
                this.items[index].quantity = newQuantity;
            }
        }
    }

    @computed get totalCost() {
        let cost: number = 0;
        this.items.forEach(item=> {
            const rootItem = this.rootstore.items.find(i => i.id === item.id);
            if(rootItem) {
                cost += rootItem.price * item.quantity;
            }
        });
        return cost;
    }

  }