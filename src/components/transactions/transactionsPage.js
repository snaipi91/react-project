'use strict';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as transactionActions from '../../actions/transactionActions';

class TransactionsPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handler = this.handler.bind(this);
	}

	handler(e) {
		e.preventDefault();
		const paymentId = this.refs.paymentId.value;
		this.props.transactionActions.getPaymentById(paymentId);
	}

	render() {
		return (
			<div>
				<input type="text" ref="paymentId"/>
				<button onClick={this.handler}>Search</button>

				<div>
					{!this.props.transaction.success && (this.props.transaction.errors || {}).message}
					{this.props.transaction.success && JSON.stringify(this.props.transaction.data)}
				</div>
			</div>
		);
	}
}

TransactionsPage.propTypes = {

};

const mapStateToProps = (state) => {
	return {
		transaction: state.transactions.transaction
	};
};

const mapDispatchToProps = dispatch => {
	return {
		transactionActions: bindActionCreators(transactionActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);