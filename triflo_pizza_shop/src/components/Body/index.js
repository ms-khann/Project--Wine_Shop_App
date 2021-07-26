import React, { useEffect, useState, useCallback } from 'react';
import './style.css';
import Filter from './Filter';
import PizzaCard from './PizzaCard';
import { numberToColorHsl } from './../../helper';
import Model from './../Modal';
import Popup from './Popup';

export default function index({
	foodData,
	setCartItemsListHandler,
	setFoodData,
	pizzaCountList,
	decremeantPizzaCount
}) {
	const [showVeg, setShowVeg] = useState('');

	const [sortBy, setSortBy] = useState('');

	const [showModal, setShowModal] = useState(false);

	const [modalData, setModalData] = useState({});

	const raitingColors = {};

	// Sorting
	useEffect(() => {
		if (sortBy != '') {
			let [_sortby, how] = sortBy.split('.');

			const newFoodData = [...foodData].sort((a, b) => {
				if (how == 'asc') {
					if (a[_sortby] < b[_sortby]) {
						return -1;
					}
					if (a[_sortby] > b[_sortby]) {
						return 1;
					}
				}
				if (how == 'dsc') {
					if (a[_sortby] < b[_sortby]) {
						return 1;
					}
					if (a[_sortby] > b[_sortby]) {
						return -1;
					}
				}
				return 0;
			});
			setFoodData(newFoodData);
		}
	}, [sortBy]);

	//HANDLERS

	const setShowVegHandler = (event) => {
		switch (event.target.dataset.type) {
			case 'veg':
				setShowVeg(true);
				break;

			case 'nonveg':
				setShowVeg(false);
				break;

			default:
				setShowVeg('');
				break;
			// const isVeg = event.target.dataset.isveg != '' ? Boolean(event.target.dataset.isveg) : '';
		}
	};

	const setSortByHandler = (event) => {
		setSortBy(event.target.value);
	};

	const setShowModalHandler = (event) => {
		setShowModal(!showModal);
		const index = event.target.dataset.index;
		const data = foodData[index];
		setModalData(data);
	};

	// const setItemCountHandler = ()=> {
	// 	setItemCount(itemCount+1)
	// }

	return (
		<div className="">
			<Popup
				modalData={modalData}
				showModal={showModal}
				setShowModalHandler={setShowModalHandler}
				setCartItemsListHandler={setCartItemsListHandler}
			/>
			<Filter setShowVegHandler={setShowVegHandler} setSortByHandler={setSortByHandler} showVeg={showVeg} />
			<div className="container">
				<div className="card-container">
					{foodData.map(({ id, name, description, img_url, isVeg, price, rating, size, toppings }, index) => {
						if (showVeg === '' || showVeg == isVeg) {
							if (!raitingColors[rating]) {
								raitingColors[rating] = numberToColorHsl(rating * 18);
							}
							let pizzaCount = pizzaCountList[id];
							return (
								<PizzaCard
									key={id}
									id={id}
									index={index}
									name={name}
									description={description}
									img_url={img_url}
									isVeg={isVeg}
									price={price}
									rating={rating}
									size={size}
									toppings={toppings}
									color={raitingColors[rating]}
									setShowModalHandler={setShowModalHandler}
									showModal={showModal}
									pizzaCount={pizzaCount}
									decremeantPizzaCount={decremeantPizzaCount}
								/>
							);
						}
						return '';
					})}
				</div>
			</div>
		</div>
	);
}
