import { connect } from 'react-redux';
import { fetchLedger, fetchLedgerOperations } from '@quanta/redux/actions/ledgers';
import { SETTINGS } from '@quanta/config';
import Ledger from '@quanta/components/pages/Ledger';

const mapStateToProps = state => ({
	ledger: state.ledgers.ledger.ledger,
	isFetching: state.ledgers.ledger.isFetching,
	operations: state.ledgers.ledger.operations,
});

const mapActionCreators = dispatch => ({
	fetchLedger: ({ id }) => {
		dispatch(fetchLedger({ id }));
	},
	fetchLedgerOperations: ({ id }) => {
		dispatch(
			fetchLedgerOperations({
				id,
				searchParams: { limit: SETTINGS.RECENT_ITEM_LENGTH, order: 'desc' },
			})
		);
	},
});

export default connect(
	mapStateToProps,
	mapActionCreators
)(Ledger);
