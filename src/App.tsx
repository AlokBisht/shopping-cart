import React from 'react';
import {initializeIcons, Pivot, PivotItem } from '@fluentui/react';
import './App.css';
import { Products } from './components/Products';
import { Cart } from './components/cart';
import { PastOrders } from './components/pastorders';


function App() {
  initializeIcons();
  return (
      <div className="App">
        <Pivot
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        styles={{
          root: {
            width: '100%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
          },     
          itemContainer: {
           height: '-webkit-fill-available',
           padding: 20,
          }     
        }}
        >
          <PivotItem           headerText="Products"           itemIcon="Shop" 
          style={{
            height: '100%',
            width: '100%',
          }}
          >
            <Products />
          </PivotItem>
          <PivotItem             headerText="Cart" 
            headerButtonProps={{
              styles: {
              root: {marginLeft: 'auto'},              
            }}} 
            style={{display: 'flex', flexDirection: 'column'}}
            itemIcon="ShoppingCartSolid"
            >
              <Cart />
            </PivotItem>
          <PivotItem             headerText="Past Orders"             itemIcon="History"            >
                <PastOrders />
            </PivotItem>
          
        </Pivot>
    </div>

  );
}

export default App;
