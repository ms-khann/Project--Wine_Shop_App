import React, { useState, useEffect } from 'react';
import {} from 'react-dom';
import './app.css';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import Cart from './components/Cart';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
// import giphy from './images/giphy.webp';
import Rhombus from './images/Rhombus.gif'
const App = () => {
	const [loading,setLoading] = useState(true)
	const [foodData, setFoodData] = useState([]);
	const [cartItemsList, setCartItemsList] = useState({});
	const [crt,setCrt] = useState([]);
	const [pizzaCountList, setPizzaCountList] = useState({});
	const [cartItemCount, setCartItemCount] = useState(0);

	// Fetching Data
	useEffect(() => {
		async function fetchMyAPI() {
			let response = await fetch('https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68');

			response = await response.json();

			setFoodData(response);
			setLoading(false);
			setPizzaCountHandler(response);
		}

		fetchMyAPI();
	}, []);

	useEffect(()=> {
		console.log(cartItemsList)
	},[cartItemsList])
	// const [cartOtemList] = useState([]);
	const setCartItemsListHandler = (event, cartItem) => {
		increameantPizzaCount(cartItem);
	};

	const setPizzaCountHandler = (res) => {
		const data = { ...pizzaCountList };
		for (let current of res) {
			let id = current.id;
			data[id] = { count: 0, total: 0 };
		}
		setPizzaCountList(data);
	};

	const increameantPizzaCount = (cartItem) => {
		const id = cartItem.id;
		const newCartList = { ...cartItemsList };

		let data = { ...pizzaCountList };
		data[id].count = data[id].count + 1;
		setPizzaCountList(data);

		if (Array.isArray(newCartList[id])) {
			newCartList[id].push(cartItem);
		} else {
			newCartList[id] = [cartItem];
		}

		setCartItemCount(cartItemCount + 1);
		setCartItemsList(newCartList);
	};

	const decremeantPizzaCount = (id) => {
		// const id = cartItem.id;
		const newCartList = { ...cartItemsList };

		let data = { ...pizzaCountList };
		data[id].count = data[id].count - 1;
		setPizzaCountList(data);

		if (newCartList[id].length == 1) {
			delete newCartList[id];
		}
		if (newCartList[id] && Array.isArray(newCartList[id])) {
			newCartList[id].pop();
		}
		setCartItemCount(cartItemCount - 1);
		setCartItemsList(newCartList);
	};

	return (
		<div className="">
			<Router>
				<Header cartItemCount={cartItemCount} />
				<Switch>
					<Route exact path="/">
						{loading == false ? <Body
							setCartItemsListHandler={setCartItemsListHandler}
							foodData={foodData}
							setFoodData={setFoodData}
							pizzaCountList={pizzaCountList}
							decremeantPizzaCount={decremeantPizzaCount}
						/> : <div className="loader"><img src={Rhombus} alt="loading" /></div>}
					</Route>
					<Route path="/cart">
						<Cart cartItemsList={cartItemsList} />
					</Route>
					<Redirect to="/" />
				</Switch>
				<Footer />
			</Router>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
