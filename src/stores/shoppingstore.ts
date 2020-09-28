import { action, computed, observable } from "mobx";
import { DEFAULT_PAGE_SIZE, Product, TOTAL_ITEMS } from "../helper";
import { RootStore } from "./rootstore";

export class ShoppingStore {

    rootstore: RootStore;
  
    @observable pageSize: number;
  
    @observable currentpage: number;
  
    constructor(rootstore: RootStore) {     
      this.rootstore = rootstore;
      this.pageSize = DEFAULT_PAGE_SIZE;
      this.currentpage = 1;
    }
  
    @action setPageSize = (pageSize: number) => {
      this.pageSize = pageSize;
      this.setCurrentPage(1);
    }
  
    @action setCurrentPage = (pageNumber: number) => {
      this.currentpage = pageNumber;
      
    }

    @computed get currentPageItems(): Product[]  {
        const total = this.pageSize * this.currentpage;
        if(total > this.rootstore.items.length) {
            const nextitems = this.rootstore.items.length + this.pageSize > TOTAL_ITEMS ?
            TOTAL_ITEMS -  this.rootstore.items.length : this.pageSize;
            this.rootstore.getitems(nextitems);
        }
        const start = this.pageSize * (this.currentpage - 1);
        return this.rootstore.items.slice(start, start +  this.pageSize);
    }       
  
  }