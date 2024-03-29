import React from 'react';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import { handleResponse, renderChangePercent } from '../../helpers';
import './Detail.css';

class Detail extends React.Component {
	constructor() {
		super();

		this.state = {
			currency: {},
			loading: false, 
			error: null,
		};
	}

	componentDidMount() {
		const currencyId = this.props.match.params.id;
		
		this.fetchCurrency(currencyId);

	}

	componentWillReceiveProps(nextProps){
		if (this.props.location.pathname !== nextProps.location.pathname) {
			// Get new currency id from url
			const newCurrencyId = nextProps.match.params.id;
			
			this.fetchCurrency(newCurrencyId);
		}
	}

	fetchCurrency(currencyId){
		this.setState({ loading: true });

		fetch(`${API_URL}/coins/${currencyId}`)
		.then(handleResponse)
		.then((currency) => {
			this.setState({
				loading: false, 
				error: null, 
				currency, 
			})
		})
		.catch((error) => {
			this.setState({
				loading: false, 
				error: error.errorMessage,
			})
		});
	}

	render() {
		const { loading, error, currency } = this.state;

		// Render if loading is set to true
		if (loading) {
			return <div className="Loading-container"><Loading /></div>
		}

		// Render if error occurs while fetching data
		if (error) {
			return <div className="error">{error}</div>
		}

		return (
			<div className="Detail">
				<h1 className="Detail-heading">
						{currency.name} ({currency.symbol})
				</h1>

				<div className="Detail-container"> 
					<div className="Detail-item">
						Price <span className="Detail-value">$ {currency.market_data ? currency.market_data.current_price.usd : ''}</span>  
					</div>
					<div className="Detail-item">
						Rank <span className="Detail-value"># {currency.market_cap_rank}</span>  
					</div>
					<div className="Detail-item">
						24H Change <span className="Detail-value"> {renderChangePercent(currency.market_data ? currency.market_data.price_change_percentage_24h : '')}</span>  
					</div>
					<div className="Detail-item">
						<span className="Detail-title">Market Cap</span>  
						<span className="Detail-dollar">$</span>  
						{currency.market_data ? currency.market_data.market_cap.usd : ''}
					</div>
					<div className="Detail-item">
						<span className="Detail-title">24H Volume</span>  
						<span className="Detail-dollar">$</span>  
						{currency.market_data ? currency.market_data.total_volume.usd : ''}
					</div>
					<div className="Detail-item">
						<span className="Detail-title">Total Supply</span>  
						<span className="Detail-dollar"></span>  
						{currency.market_data ? currency.market_data.total_supply : ''}
					</div>
				</div>
			</div>
		);
	}
}

export default Detail;
