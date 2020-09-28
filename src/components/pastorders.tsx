import { DetailsList, DetailsListLayoutMode, IColumn, Label, SelectionMode } from '@fluentui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { OrderProduct, Product } from '../helper';
import { useStores } from '../stores/storescontext';


const Ordercolumns: IColumn[] = [
    {
        key: 'productImage',
        name: 'Product',
        fieldName: 'image',
        isResizable: true,
        minWidth: 16,
        maxWidth: 300,
        onRender: (item: Product) => {
            return (<img src={item.iconName} alt={item.iconName} height="50" />);
        },
    },{
        key: 'productName',
        name: 'Product Name',
        fieldName: 'name',
        isResizable: true,
        minWidth: 16,
        maxWidth: 200,
    },{
        key: 'productQuantity',
        name: 'Quantity',
        fieldName: 'quantity',
        isResizable: true,
        minWidth: 16,
        maxWidth: 200,
    },{
        key: 'productPrice',
        name: 'Product price',
        fieldName: 'price',
        isResizable: true,
        minWidth: 16,
        maxWidth: 200,
    },{
        key: 'productPrice',
        name: 'Total Cost',
        fieldName: 'cost',
        isResizable: true,
        minWidth: 16,
        maxWidth: 200,
    }, {
        key: 'purchase Date',
        name: 'Purchase Date',
        fieldName: 'purchasedAt',
        isSortedDescending: true,
        minWidth: 16,
        maxWidth: 300,
        onRender: (item: OrderProduct) => {
            const date = item.purchasedAt;
            return (<Label>{date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()}</Label>);
        },
    },
];



export const PastOrders = observer(()=> {
    const { rootStore } = useStores();
    const { ordersStore, items: rootItems } = rootStore;
    const { items } = ordersStore;
    return items.length ? (
        <DetailsList
            items={items.map(item => {
                const rootItem = rootItems.find(i => i.id === item.id);
                if(rootItem) {
                    return {...rootItem, ...item};
                }
                return item;
            })}
            compact={true}
            columns={Ordercolumns}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            styles={{
                    root: {
                            width: '100%',
                            height: '-webkit-fill-available',
                            border: '1px solid black',
                        },
                }}
            />
    ): (
        <>
            <Label styles={{root:{fontSize: 30}}}>No past Orders</Label>
        </>
    );

});
