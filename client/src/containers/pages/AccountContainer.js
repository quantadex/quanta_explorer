import { connect } from 'react-redux';
import Account from '@quanta/components/pages/Account';
import { fetchAccount, fetchAccountOperations } from '@quanta/redux/actions/account';
import { SETTINGS } from '@quanta/config';

const mapStateToProps = state => ({
	account: state.account.account,
	isFetching: state.account.isFetching,
	hasError: state.account.hasError,
	operations: state.account.operations,
});

const mapActionCreators = dispatch => ({
	fetchAccount: ({ id }) => {
		dispatch(fetchAccount({ id }));
	},
	fetchAccountOperations: ({ id }) => {
		dispatch(
			fetchAccountOperations({
				id,
				searchParams: { limit: SETTINGS.RECENT_ITEM_LENGTH, order: 'desc' },
			})
		);
	},
});

export default connect(
	mapStateToProps,
	mapActionCreators
)(Account);
