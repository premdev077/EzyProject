import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { productQuantity, clearProduct} from '../actions/productQuantity';
import Home from './Home';

import Sledgehammer from '../images/Sledgehammer.jpg';
import Axe from '../images/Axe.jpg';
import Bandsaw from '../images/Bandsaw.jpg';
import Chisel from '../images/Chisel.jpg';
import Hacksaw from '../images/Hacksaw.jpg';

function Cart({basketProps, productQuantity, clearProduct}) {
    let productsInCart = [];

    Object.keys(basketProps.products).forEach( function(item) {
        if(basketProps.products[item].inCart) {
            productsInCart.push(basketProps.products[item])
        }
    });

    const productImages = (product) => {
        if( product.tagName === 'Sledgehammer') {
            return Sledgehammer;
        } else if(product.tagName === 'Axe') {
            return Axe;
        } else if(product.tagName === 'Bandsaw') {
            return Bandsaw;
        } else if(product.tagName === 'Chisel') {
            return Chisel;
        } else if(product.tagName === 'Hacksaw') {
            return Hacksaw;
        }
    }

    productsInCart = productsInCart.map( (product, index) => {
        return (
            <Fragment key={index}>
            
                <div className="product">
                    <span className="sm-hide">{product.name}</span>
                    <img src={productImages(product)} />
                    
                </div>
                <div className="price sm-hide">${product.price}</div>
                <div className="quantity">
                    <a
                        onClick={() => productQuantity('decrease', product.tagName)}
                        className="decrease"
                        name="arrow-back-circle-outline"
                    >
                        <FaMinus size="20px"/>
                    </a>
                    <span className="product-number"> {product.numbers} </span>
                    <a
                    onClick={() => productQuantity('increase', product.tagName)}
                    className="increase"
                    name="arrow-forward-circle-outline"
                    >
                        <FaPlus size="20px"/>
                    </a>
                </div>
                <div className="total">
                    <span className="product-number">
                        ${parseFloat(product.numbers * product.price).toFixed(2)}
                    </span>
                    <a onClick={() => clearProduct(product.tagName)} name="close-circle">
                        <FaTrash size="30px" color="red"/>
                    </a>
                </div>
            </Fragment>
        )
    });

    return (
        <div className="row">
            <div className="container-products">
                <div className="product-header">
                    <h5 className="product-title">PRODUCT</h5>
                    <h5 className="price sm-hide">PRICE</h5>
                    <h5 className="quantity">QUANTITY</h5>
                    <h5 className="total">TOTAL</h5>
                </div>
                <div className="products">
                    { productsInCart }
                </div>
                <div className="basketTotalContainer">
                    <h4 className="basketTotalTitle">Basket Total</h4>
                    <h4 className="basketTotal">
                        ${parseFloat(basketProps.cartCost).toFixed(2)}
                    </h4>
                </div>
            </div>
            <Home />
        </div>
    )
}

const mapStateToProps = state => ({
    basketProps: state.basketState
});


export default connect(mapStateToProps, { productQuantity, clearProduct } )(Cart);

