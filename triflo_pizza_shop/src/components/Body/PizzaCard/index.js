import React, { useState } from 'react';
import './style.css';
import StarIcon from '@material-ui/icons/Star';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Modal from './../../Modal';

export default function PizzaCard({
	id,
	index,
	name,
	description,
	img_url,
	isVeg,
	price,
	rating,
	size,
	toppings,
	color,
	setShowModalHandler,
	showModal,
	pizzaCount,
	decremeantPizzaCount
}) {
	// const [itemCount, setItemCount] = useState(0);
	let count= 0;
	if(pizzaCount){
		count= pizzaCount.count;
		// setItemCount(pizzaCount.count)

	}
	return (
		<>
			<div className="card">
				<div className="card-img">
					<img src={img_url} alt={name} />
				</div>
				<div className="card-details">
					<div className="details">
						<div className="mark">
							<span className={`agmark ${isVeg ? 'agmark-veg' : 'agmark-nonveg'}`}></span>
							<h4 className="product-name">{name}</h4>
						</div>
						<p>{description}</p>
					</div>
					<div className="raiting-details">
						<div className="star-raiting" style={{ backgroundColor: color }}>
							<span className="star">
								<StarIcon />
							</span>
							<span className="rating">{rating}</span>
						</div>
						<div className="price">RS. {price}</div>
					</div>
					<div className="add-remove">
						<div className="counter">
							<button disabled={count == 0} onClick={()=> {
								decremeantPizzaCount(id);
							}}>-</button>
							<span className="">{count}</span>
							<button
								onClick={setShowModalHandler}
								data-index={index}>
								+
							</button>
						</div>
						{/* <div className="cart-icon">
							<ShoppingCartIcon />
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
}
