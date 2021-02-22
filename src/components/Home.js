import React from 'react';
import { useSelector } from 'react-redux';

import Sledgehammer from '../images/Sledgehammer.jpg';
import Axe from '../images/Axe.jpg';
import Bandsaw from '../images/Bandsaw.jpg';
import Chisel from '../images/Chisel.jpg';
import Hacksaw from '../images/Hacksaw.jpg';

import { connect } from 'react-redux';
import { addBasket } from '../actions/addAction';

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

const Home = (props) => {
    const products = useSelector(state => state.basketState.products);
    
    return(
        <div className="container"> 
            {products.map((product, key) => {
                return (
                    <div className="image" key={key}>
                        <img src={productImages(product)} alt="Sledgehammer" />
                        <h3>{product.name}</h3>
                        <h3 className="cart-price"> ${parseFloat(product.price).toFixed(2)}</h3>
                        <a 
                            onClick={() => props.addBasket(product.tagName)}
                            className="addToCart cart1"
                            href="#"
                        >
                            Add to Cart
                        </a>
                    </div>
                );
            })}
        </div>
    );
}

export default connect(null, { addBasket })(Home);