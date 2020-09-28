import './Products.css';
import { 
    DefaultButton, DetailsList, DetailsListLayoutMode,  Dropdown, IColumn, 
    IDropdownOption, Label, PrimaryButton, SelectionMode 
} from '@fluentui/react';
import React from 'react';
import { observer } from 'mobx-react';
import { getPageSizeOptions,  Product, TOTAL_ITEMS } from '../helper';
import { useStores } from '../stores/storescontext';

const Productcolumns: IColumn[] = [
    {
        key: 'productImage',
        name: 'Product',
        fieldName: 'image',
        isResizable: true,
        minWidth: 16,
        maxWidth: 400,
        onRender: (item: Product) => {
            return (<img src={item.iconName} alt={item.iconName} height="50" />);
        },
    },{
        key: 'productName',
        name: 'Product Name',
        fieldName: 'name',
        isResizable: true,
        minWidth: 16,
        maxWidth: 300,
    },{
        key: 'productPrice',
        name: 'Product Price',
        fieldName: 'price',
        isResizable: true,
        minWidth: 16,
        maxWidth: 300,
    },
];

export const Products = observer(() => {
    const { rootStore } = useStores();
    const { shoppingStore, cartStore } = rootStore;
    const {currentPageItems, pageSize, currentpage , setCurrentPage, setPageSize} = shoppingStore;
    const nextPage = TOTAL_ITEMS > pageSize * currentpage;
    const previousPage = currentpage > 1

    const addToCart: IColumn = {
        key: 'actions',
        name: 'Actions',
        isIconOnly: true,
        isResizable: true,
        minWidth: 16,
        maxWidth: 200,
        onRender: (item: Product) => {
            return (
                <>
                    <PrimaryButton 
                    text="Add to Cart" 
                    styles={{root:{margin: 2}}} 
                    onClick={() => {
                        cartStore.addProduct(item.id);
                    }}
                    />
                </>
            );
        },
    };

    return (
        <>
            <DetailsList
                            items={currentPageItems}
                            compact={true}
                            columns={[...Productcolumns, addToCart]}
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
                
            
            <div style={{
                display: 'flex', 
                justifyContent: 'flex-start', 
                alignItems: 'center',
                paddingRight: 30}}>
                <Dropdown 
                    label="No of Items"
                    options={getPageSizeOptions()}
                    selectedKey={String(pageSize)}
                    onChange={(ev: unknown, option?: IDropdownOption ) => {
                        if(option) {
                            setPageSize(Number(option.key));
                        }
                    }}
                    styles={{
                        root: {display: 'flex'},
                        dropdown: {marginLeft: 5},
                    }}
                />
                <Label styles={{root: {marginLeft: 10}}} >{`Page ${currentpage} of ${Math.ceil(TOTAL_ITEMS / pageSize)}`}  </Label>
            <div style={{marginLeft: 'auto'}}>
                        <DefaultButton 
                            text="previous Page" 
                            styles={{
                                root: {marginTop: 15, margin: 5}
                            }}
                            onClick={() => setCurrentPage(currentpage - 1)}
                            disabled={!previousPage}
                            />
                            <DefaultButton 
                            text="Next Page" 
                            styles={{
                                root: {marginTop: 15, margin: 5}
                            }}
                            onClick={() => setCurrentPage(currentpage + 1)}
                            disabled={!nextPage}
                            />
            </div>
            
            </div>

        </>
    )
    ;

});


