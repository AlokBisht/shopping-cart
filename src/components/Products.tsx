import './Products.css';
import { 
    DefaultButton, DetailsList, DetailsListLayoutMode,  DirectionalHint,  Dropdown, HoverCard, HoverCardType, IColumn, 
    IDropdownOption, Label, PrimaryButton, SelectionMode, Text,
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
            return (
                <HoverCard
                plainCardProps={{
                    onRenderPlainCard: () => {
                        return (
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                            <img 
                                src={item.iconName} 
                                alt={item.iconName}
                            />
                            <Label styles={{root: {width: '100%', whiteSpace: 'pre-wrap', padding: 5}}}>
                                <h3>Product Description:</h3>
                                <Text>{item.desc}</Text>
                            </Label>
                            </div>
                        );
                    },
                    calloutProps: {
                        gapSpace: -80,
                        isBeakVisible: true,
                        directionalHint: DirectionalHint.rightCenter,
                        minPagePadding: 10,
                    }
                }}
                instantOpenOnClick
                type={HoverCardType.plain}
                >
                    <img src={item.iconName} alt={item.iconName} height="50" />
                </HoverCard>
            );
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
        maxWidth: 200,
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
        maxWidth: 100,
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
                                    overflowX: 'auto',
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


