import { IDropdownOption } from "@fluentui/react";
import { commerce, image, random  } from 'faker';

export interface Product {
    id: string;
    iconName: string;
    name: string;
    desc: string;
    price: number;
  }

export type CartProduct = Pick<Product, 'id'> & {quantity: number};

export type OrderProduct = CartProduct & {cost: number; purchasedAt: Date};

export const DEFAULT_PAGE_SIZE = 15;
export const TOTAL_ITEMS = 100;

export function getPageSizeOptions(): IDropdownOption[] {
    const items:IDropdownOption[] = [];
    for(let i = 1; i<= 5; i++) {
        items.push({
            key: String(DEFAULT_PAGE_SIZE * i),
            text: String(DEFAULT_PAGE_SIZE * i),
        });
    }
    return items;
}

  export function createItems(limit: number): Product[] {
      const items: Product[] = [];
      for(let i = 0; i < limit; i++) {
        items.push(
          {
            id: random.uuid(),
            name: commerce.productName(), 
            desc: commerce.productDescription(),
            price: Number(commerce.price()), 
            iconName: `${image.animals()}?random=${random.number(1000000)}`
          }
        );
      }
      return items;
  }