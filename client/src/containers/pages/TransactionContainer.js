import { connect } from 'react-redux';
import { fetchTransaction, fetchTransactionOperations } from '@quanta/redux/actions/transactions';
import { SETTINGS } from '@quanta/config';
import Transaction from '@quanta/components/pages/Transaction';

const mapStateToProps = state => ({
	transaction: state.transactions.transaction.transaction,
	isFetching: state.transactions.transaction.isFetching,
	hasError: state.transactions.transaction.hasError,
	operations: state.transactions.transaction.operations,
});

const mapActionCreators = dispatch => ({
	fetchTransaction: ({ id }) => {
		dispatch(fetchTransaction({ id }));
	},
	fetchTransactionOperations: ({ id }) => {
		dispatch(
			fetchTransactionOperations({
				id,
				searchParams: { limit: SETTINGS.RECENT_ITEM_LENGTH, order: 'desc' },
			})
		);
	},
});

export default connect(
	mapStateToProps,
	mapActionCreators
)(Transaction);
