import React from 'react';
import { withRouter } from 'react-router-dom';
import { renderChangePercent } from '../../helpers';
import PropTypes from 'prop-types';
import './Table.css';

const Table = (props) => {
	const {currencies, history} = props;

	return (
		<div className="Table-container">
			<table className="Table">
				<thead className="Table-head">
					<tr>
						<th>Cryptocurrency</th>
						<th>Price</th>
						<th>Market</th>
						<th>24H Change</th>
					</tr>
				</thead>
				<tbody className="Table-body">
					{currencies.map((currency) => (
						<tr 
							key={currency.id}
							onClick={() => history.push(`/currency/${currency.id}`)}
						>
							<td>
								<div className="Table-td">
									<span className="Table-rank">{currency.market_cap_rank}</span>
									{currency.name}
									<img src={currency.image} alt="Coin icon" width="20"/>
								</div>
							</td>
							<td>
								<span className="Table-dollar"></span>
								{currency.current_price}
							</td>
							<td>
								<span className="Table-dollar"></span>
								{currency.market_cap}
							</td>
							<td>{renderChangePercent(currency.price_change_percentage_24h)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

Table.propTypes = {
	currencies: PropTypes.array.isRequired,
	history: PropTypes.object.isRequired,
}

export default withRouter(Table);