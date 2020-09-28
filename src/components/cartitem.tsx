import { IconButton, Label, SpinButton } from '@fluentui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { CartProduct, Product } from '../helper';

export const CartItem = observer((props: 
    {
        cartProduct: Product & CartProduct;
        onUpdate: (id: string, newQuantity: number) => void
        removeProduct: (id: string) => void
    }) => {
    const { cartProduct, onUpdate, removeProduct } = props;
    return (
        <>
        <div 
        style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: 5, 
            borderTop: '1px solid'
            }}>
            <img 
                src={cartProduct.iconName} 
                alt={cartProduct.iconName}
                style={{height: 100, width: 100}}
             />
            <Label>{cartProduct.name}</Label>
            <SpinButton 
                        label="Quantity"
                        min={1}
                        max={50}
                        styles={{root: {width: 20}}} 
                        value={String(cartProduct.quantity)}
                        onIncrement={()=>onUpdate(cartProduct.id, cartProduct.quantity + 1)}
                        onDecrement={()=>onUpdate(cartProduct.id, cartProduct.quantity - 1)}
                    />
            <Label>{`Price: \n ${cartProduct.price}`}</Label>
            <IconButton 
                    styles={{root: {height: 'auto'}, icon: {fontSize: 25}}}
                    iconProps={{iconName: 'delete'}}
                    onClick={()=> removeProduct(cartProduct.id)}
                    />
        </div>
        </>
    );
});
