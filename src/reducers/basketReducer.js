import { 
    ADD_PRODUCT_BASKET,
    GET_NUMBERS_BASKET,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    CLEAR_PRODUCT
} from '../actions/types';

const initialState = {
    basketNumbers: 0,
    cartCost: 0,
    products: [
        {
            name: "Sledge Hammer",
            tagName: 'Sledgehammer',
            price: 125.75,
            numbers: 0,
            inCart: false
        },
        {
            name: "Axe",
            tagName: 'Axe',
            price: 190.50,
            numbers: 0,
            inCart: false
        },
        {
            name: "Bandsaw",
            tagName: 'Bandsaw',
            price: 562.13,
            numbers: 0,
            inCart: false
        },
        {
            name: "Chisel",
            tagName: 'Chisel',
            price: 12.90,
            numbers: 0,
            inCart: false
        },
        {
            name: "Hacksaw",
            tagName: 'Hacksaw',
            price: 18.45,
            numbers: 0,
            inCart: false
        }
    ]
}

const selectedProduct = (products, tagName) => {
    return products.filter(
        product => product.tagName === tagName
    );
}

export default (state = initialState, action) => {
    let productSelected = "";
    const products = state.products;

    switch(action.type) {
        case ADD_PRODUCT_BASKET:
            productSelected = selectedProduct(products, action.payload)[0];

            products.find(product => product.tagName === action.payload).numbers += 1;
            products.find(product => product.tagName === action.payload).inCart = true;

            return {
                ...state,
                basketNumbers: state.basketNumbers + 1,
                cartCost: state.cartCost + productSelected.price,
                products: [
                    ...products
                ]
            };
        case GET_NUMBERS_BASKET:
            return {
                ...state
            };
        case INCREASE_QUANTITY:
            productSelected = selectedProduct(products, action.payload)[0];
            products.find(product => product.tagName === action.payload).numbers += 1;

            return {
                ...state,
                basketNumbers: state.basketNumbers + 1,
                cartCost: state.cartCost + productSelected.price,
                products: [
                    ...products
                ]
            }
        case DECREASE_QUANTITY:
            productSelected = selectedProduct(products, action.payload)[0];

            let newCartCost = 0;
            let newBasketNumbers = 0;
            if( productSelected.numbers === 0) {
                products.find(product => product.tagName === action.payload).numbers = 0;

                newCartCost = state.cartCost;
                newBasketNumbers = state.basketNumbers;
            } else {
                if (productSelected.numbers === 1) {
                    products.find(product => product.tagName === action.payload).inCart = false;
                }
                
                products.find(product => product.tagName === action.payload).numbers -= 1;
                newCartCost = state.cartCost - productSelected.price;
                newBasketNumbers = state.basketNumbers - 1;
            }
            
            return {
                ...state,
                basketNumbers: newBasketNumbers,
                cartCost: newCartCost,
                products: [
                    ...products
                ]
            }
        case CLEAR_PRODUCT: 
            productSelected = selectedProduct(products, action.payload)[0];
            let numbersBackup = productSelected.numbers;
            
            products.find(product => product.tagName === action.payload).numbers = 0;
            products.find(product => product.tagName === action.payload).inCart = false;

            return {
                ...state,
                basketNumbers: state.basketNumbers - numbersBackup,
                cartCost: state.cartCost - (numbersBackup * productSelected.price),
                products: [
                    ...products
                ]
            }
        default:
            return state;
    }
}