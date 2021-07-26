import React, { useState } from 'react';
import Modal from './../../Modal';
import './style.css';
import CloseIcon from '@material-ui/icons/Close';

export default function Popup({ modalData, showModal, setShowModalHandler, setCartItemsListHandler }) {
	if (showModal == true) {
		const { id,name, price, size, toppings,img_url } = modalData;
		const { title, isRadio, items } = size[0];
		const { title: titleTopping, isRadio: isRadioTopping, items: itemsTopping } = toppings[0];
		const [selectedSize, setSelectedSize] = useState('');
		const [selectedToppings, setSelectedToppings] = useState({});
		const [err, setError] = useState(false);
		const [errMsg, setErrMsg] = useState('');

		const setSelectedSizeHandler = (event) => {
			setSelectedSize(event.target.value);
			// setSelectedSize(event.target.value)
			// setSelectedSize()
		};
		const setSelectedToppingsHandler = (event) => {
			if (event.target.type == 'radio') {
				const toppings = {};
				toppings[event.target.value] = true;
				setSelectedToppings(toppings);
			} else {
				const toppings = { ...selectedToppings };
				const val = event.target.value;

				if (toppings[val] == undefined || toppings[val] == false) {
					toppings[val] = true;
				} else {
					toppings[val] = false;
				}
				setSelectedToppings(toppings);
			}
		};

		const isSubmit = () => {
			if (selectedSize === '') {
                setError(true);
				setErrMsg('please Select Size');
				return false;
			}else{
                for (let current in selectedToppings) {
                    if (selectedToppings[current] == true) {
                        setError(false);
                        return true;
                    }
                }
                setError(true);
                setErrMsg('Please Select Toppings');
                return false;
            }
		};

		return (
			<div>
				{showModal ? (
					<Modal>
						<>
							<div className="popup">
								<div className="popup-head">
									<h3 className="title">{name}</h3>
								</div>
								<div className="popup-body">
									<div className="popup-content">
										<div className="size">
											<h4 className="title">{title}</h4>
											<div>
												{isRadio
													? items.map((current, index) => {
															return (
																<label className="custom custom-radio" key={index}>
																	<input
																		type="radio"
																		name="size"
																		value={current.size}
																		onChange={setSelectedSizeHandler}
																	/>
																	<span className="radio"></span>
																	<span className="size-type">{current.size}</span>
																</label>
															);
													  })
													: items.map((current, index) => {
															return (
																<label className="custom custom-checkbox" key={index}>
																	<input
																		type="checkbox"
																		name="size"
																		value={current.size}
																		onChange={setSelectedSizeHandler}
																	/>
																	<span className="checkbox"></span>
																	<span className="size-type">{current.size}</span>
																</label>
															);
													  })}
											</div>
										</div>
										<div className="toppings">
											<h4 className="title">{titleTopping}</h4>
											<div>
												{isRadioTopping
													? itemsTopping.map((current, index) => {
															return (
																<label className="custom custom-radio" key={index}>
																	<input
																		type="radio"
																		name="topping"
																		value={current.name}
																		onChange={setSelectedToppingsHandler}
																	/>
																	<span className="radio"></span>
																	<span className="size-type">{current.name}</span>
																</label>
															);
													  })
													: itemsTopping.map((current, index) => {
															return (
																<label className="custom custom-check" key={index}>
																	<input
																		type="checkbox"
																		name="topping"
																		value={current.name}
																		onChange={setSelectedToppingsHandler}
																	/>
																	<span className="checkbox"></span>
																	<span className="sxize-type">{current.name}</span>
																</label>
															);
													  })}
											</div>
										</div>
									</div>
									<div className="btn-and-err">
										{err ? <span className="err">{errMsg}</span> : ''}
										<button
											className="add-to-cart"
											onClick={(event) => {
                                                if(isSubmit() == true){
                                                    setCartItemsListHandler(event, {
														id,
                                                        name,
                                                        price,
														img_url,
                                                        selectedSize,
                                                        selectedToppings
                                                    });
                                                    setShowModalHandler(event);
                                                }
											}}>
											Add To Cart
										</button>
									</div>
								</div>
								<button className="close" onClick={setShowModalHandler}>
									<CloseIcon />
								</button>
							</div>
							<div className="modal-layer" onClick={setShowModalHandler}></div>
						</>
					</Modal>
				) : null}
			</div>
		);
	} else {
		return '';
	}
}
