import React from 'react';
import './style.css';

export default function index({ cartItemsList }) {
	// console.log(cartItemsList);
	const cleanCartList = [];
	for (let current in cartItemsList) {
		const sub_arr = cartItemsList[current];
		const cart = {};
		for (let obj of sub_arr) {
			console.log(obj);
			cart.id = obj.id;
			cart.name = obj.name;
			cart.price = obj.price;
			cart.img_url = obj.img_url;
			if (!cart.sizes) {
				cart.sizes = [obj.selectedSize];
			} else {
				cart.sizes.push(obj.selectedSize);
			}
			if (!cart.toppings) {
				cart.toppings = [obj.selectedToppings];
			} else {
				cart.toppings.push(obj.selectedToppings);
			}
		}
		cart.total = cart.sizes.length * cart.price;
		cleanCartList.push(cart);
	}
	console.log(cleanCartList);
	return (
		<div className="container-fluid">
			<div className="container">
				<div className="inner-cart">
					<h3 className="shop-title">Shopping Cart :</h3>
					<div className="cart-content">
						<ul className="cart-list">
							{cleanCartList.map((current) => {
								const { id, name, img_url, price, total,sizes,toppings } = current;
								return (
									<li className="single-cart-content" key={id}>
										<div className="img">
											<img src={img_url} alt={name} />
										</div>
										<div className="details">
											<h4 className="name">{name}</h4>
											<ul className="size-and-toppings">
												<li>
													<span className="size">Size</span>
													<span className="toppings">Topping</span>
													<span className="price">Price</span>
												</li>
												{sizes.map((val, index) => {
													let top_val = toppings[index];
													let data = [];
													for(let current_topping in top_val){
														if(top_val[current_topping]){
															data.push(current_topping)
														}
													}
													// console.log(data)
													return (
														<li key={index}>
															<span className="size">{val}</span>
															<span className="toppings">{data}</span>
															<span className="price">RS. {price}</span>
														</li>
													);
												})}
												{/* <li>
													<span className="size">Medium</span>
													<span className="toppings">Onion</span>
													<span className="price">100</span>
												</li>
												<li>
													<span className="size">Size</span>
													<span className="toppings">Topping</span>
													<span className="price">100</span>
												</li>
												<li>
													<span className="size">Size</span>
													<span className="toppings">Topping</span>
													<span className="price">100</span>
												</li> */}
											</ul>
											<span className="subtotal">RS. {total}</span>
										</div>
									</li>
								);
							})}
						</ul>
						<div className="foot">
							<h4 className="grand-total">Total: Rs {cleanCartList.reduceRight((acc,current)=>{
								return acc + current.total;
							},0)}</h4>
							<button className="checkout">Checkout</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
