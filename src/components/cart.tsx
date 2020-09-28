import { Dialog, DialogType, Label, MessageBar, MessageBarType, PrimaryButton } from '@fluentui/react';
import { cloneDeep } from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../stores/storescontext';
import { CartItem } from './cartitem';

export const Cart = observer(() => {
    const { rootStore } = useStores();
    const { cartStore, ordersStore } = rootStore;
    const {items, totalCost} = cartStore;

    const [success, setSuccess] = React.useState(false);
    const [outOfStock, setOutOfStock] = React.useState<String[]>([]);

    function checkoutClick() {        
        if(items.some(item => item.quantity > 5)) {
            setOutOfStock(items.filter(item => item.quantity > 5).map(i => i.id));
            return;
        } else {
            setOutOfStock([]);
        }
        items.forEach(item => {
            var clone = cloneDeep(item);
            const rootItem =  rootStore.items.find(i => i.id === clone.id);
            if(rootItem) {
                ordersStore.addProduct({
                    ...clone,
                     cost: clone.quantity * rootItem.price,
                     purchasedAt: new Date()
                    });
            }
        });
        cartStore.clearProducts();
        setSuccess(true);
    }

    return  ( 
        success ? (
            <Dialog 
                dialogContentProps={{
                    title: 'Success',
                    subText: 'Order palced successfully',
                    type: DialogType.close,
                    
                }} 
                hidden={!success}
                onDismiss={() => setSuccess(false)}
                type={DialogType.close}
            />
        ) : 
        (
        <>
        {outOfStock.length > 0 
        &&  
        <MessageBar
                messageBarType={MessageBarType.error} 
                messageBarIconProps={{iconName: 'StatusErrorFull'}}
                onDismiss={() => setOutOfStock([])}
         >
             {`Product(s)
                ${outOfStock.map(item => rootStore.items.find(i => i.id === item)?.name).join(', ')} 
                are out of stock. You can try again after reducing the quantity of items.`}
         </MessageBar>
        }
            <PrimaryButton 
            text="Checkout" 
            styles={{root: { marginLeft: 'auto', marginTop: 10, marginBottom: 10}}} 
            disabled={!items.length}
            onClick={checkoutClick}
            />
            <div style={{marginLeft: 'auto', marginTop: 10, marginBottom: 10}}>
                {
                    items.length ?
                    (   <>
                        <Label>Total Price</Label>
                        <Label 
                        styles={{root: {fontWeight: 800}}}
                        >
                            {totalCost}
                        </Label>
                        </>
                    )
                    :
                    (React.Fragment)
                }
            </div>
            { items.length ?        
                (
                    
                        items.map(item => {
                            const rootItem = rootStore.items.find(i => i.id === item.id);
                            return ( rootItem ?
                            <CartItem 
                                key={item.id}
                                cartProduct={{...rootItem, ...item}} 
                                onUpdate={cartStore.udpateProductQuantity} 
                                removeProduct={cartStore.removeProduct}
                                />
                                :
                                <></>
                            );
                        }) 
                )             
                :
                (<Label styles={{root:{fontSize: 30}}}>Your cart is empty</Label>)
            }
            
        </>
    )
    );

});
