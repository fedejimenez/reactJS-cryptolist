import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import './Table.css';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component {
	constructor() {
		super();

		this.state = {
			loading: false,
			currencies: [],
			error: null,
			totalPages: 100,
			page: 1,
		};

		this.handlePaginationClick = this.handlePaginationClick.bind(this);
	}

	componentDidMount() {
		this.fetchCurrencies();
	}

	fetchCurrencies() {
		this.setState({ loading: true });
		const { page } = this.state;

		fetch(`${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false`)
		    .then(handleResponse)
		    .then((data) => {
		      const currencies = data;
		      this.setState({
		       	  currencies,
		       	  loading: false
		   		});
		    })
		    .catch((error) => {
		      this.setState({
		          error: error.errorMessage,
		          loading: false
		   		});
		    });
	}


	handlePaginationClick(direction) {
		let nextPage = this.state.page;

		// Increment or decrement page 
		nextPage = direction === 'next' ? nextPage + 1 : nextPage -1;
		
		this.setState({ page: nextPage}, () => {
			// call fetschCurrencies inside callback
			// we need to get updated first page
			this.fetchCurrencies();
		});

	}

	render() {
		const { loading, error, currencies, page, totalPages } = this.state;
		// render only component, if loading state is true
		if (loading) {
			return <div className="loading-container"><Loading /></div>
		}

		// render only errorMessage, if error is true while fetching data
		if (error) {
			return <div className="error">{error}</div>
		}

		return (
			<div>
				<Table 
					currencies={currencies}
				/>
				<Pagination
					page={page}
					totalPages={totalPages}
					handlePaginationClick={this.handlePaginationClick }
				/>
			</div>
		);
	}
}

export default List;