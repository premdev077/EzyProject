import React, {useEffect} from 'react';
import { connect, useSelector } from 'react-redux';
import { FaShoppingBasket, FaHouseDamage } from 'react-icons/fa';
import { getNumbers } from '../actions/getAction';
import { Link } from 'react-router-dom';

function Navbar(props) {
    const basketNumbers = useSelector(state => state.basketState.basketNumbers);

    useEffect(() => {
        getNumbers(); 
    }, []);

    return (
        <header>
            <div className="overlay"></div>
            <nav>
            <h2 className="header-title">Shopping Cart</h2>
            <ul>
                <li><Link to="/">
                    <FaHouseDamage />
                    <span> Home  </span>
                    </Link>
                </li>
                <li className="cart">
                    <Link to="/cart">
                            <FaShoppingBasket />
                            <span> Cart  </span>
                            <span> {basketNumbers}</span>
                </Link></li>
            </ul> 
            </nav>
      </header>
    );
}

export default connect(null, { getNumbers })(Navbar);