import React from 'react';
import './style.css';

export default function Filter({ setShowVegHandler, showVeg, setSortByHandler }) {
	return (
		<div className="container-fluid filter">
			<div className="container">
				<div className="inner-filter">
					<div className="sort-by">
						<span>Sort By:</span>
						<select onChange={setSortByHandler}>
							<option value="">-- select to sort --</option>
							<option value="price.dsc">Price: High to low</option>
							<option value="price.asc">Price: low to high</option>
							<option value="name.asc">Name: A to Z</option>
							<option value="name.dsc">Name: Z to A</option>
							<option value="rating.dsc">Raiting: High to low</option>
							<option value="rating.asc">Raiting: low to High</option>
						</select>
					</div>
					<div className="veg-or-noveg">
						<ul>
							<li
								data-type="all"
								className={`${showVeg === '' ? 'active' : ''}`}
								onClick={setShowVegHandler}>
								All
							</li>
							<li
								data-type="veg"
								className={`${showVeg === true ? 'active' : ''}`}
								onClick={setShowVegHandler}>
								Veg
							</li>
							<li
								data-type="nonveg"
								className={`${showVeg === false ? 'active' : ''}`}
								onClick={setShowVegHandler}>
								Non Veg
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
