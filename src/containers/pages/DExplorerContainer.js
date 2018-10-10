import { connect } from 'react-redux';
import { fetchOperations } from '@quanta/redux/actions/operations';
import { fetchLedgers } from '@quanta/redux/actions/ledgers';

import DExplorer from '../../components/pages/DExplorer';

const mapStateToProps = state => ({
	isFetchingOperations: state.operations.isFetching,
	isFetchingLedgers: state.ledgers.isFetching,
	operations: state.operations.operations,
	ledgers: state.ledgers.ledgers,
});

const mapActionCreators = dispatch => ({
	fetchOperations: () => {
		dispatch(fetchOperations({ limit: 8 }));
	},
	fetchLedgers: () => {
		dispatch(fetchLedgers({ limit: 8 }));
	},
});

export default connect(
	mapStateToProps,
	mapActionCreators
)(DExplorer);
