import React, { useState } from 'react';
import './style.css';
import swiggy from './swiggy.png';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { BrowserRouter as Router, Link } from 'react-router-dom';
export default function Header({ cartItemCount }) {
	// const [cart_item_count, set_cart_item_count] = useState(10);

	return (
		<header className="container-fluid">
			<div className="container">
				<Link to="/">
					<h1 className="logo">
						<img src={swiggy} alt="logo" />
					</h1>
				</Link>
				<Link to="/cart">
					<div className="cartIcon">
						<ShoppingCartIcon />
						{cartItemCount > 0 ? <span className="cart-item-count">{cartItemCount}</span> : null}
					</div>
				</Link>
			</div>
		</header>
	);
}
