import { connect } from 'react-redux';
import { fetchOperations } from '@quanta/redux/actions/operations';
import { fetchLedgers } from '@quanta/redux/actions/ledgers';
import { fetchMetrics } from '@quanta/redux/actions/metrics';
import { setAverageBlockLatency, fetchNodeCount } from '@quanta/redux/actions/global';
import { SETTINGS } from '@quanta/config';
import DExplorer from '@quanta/components/pages/DExplorer';

const mapStateToProps = state => ({
	operations: state.operations.operations,
	ledgers: state.ledgers.ledgers,
	metrics: state.metrics.metrics,
	averageBlockLatency: state.global.averageBlockLatency,
	nodeCount: state.global.nodeCount,
	environmentType: state.header.environmentType,
});

const mapActionCreators = dispatch => ({
	fetchOperations: () => {
		dispatch(fetchOperations({ limit: SETTINGS.RECENT_ITEM_LENGTH, order: 'desc' }));
	},
	fetchLedgers: () => {
		dispatch(fetchLedgers({ limit: SETTINGS.RECENT_ITEM_LENGTH, order: 'desc' }));
	},
	fetchMetrics: () => {
		dispatch(fetchMetrics());
	},
	setAverageBlockLatency: averageBlockLatency => {
		dispatch(setAverageBlockLatency(averageBlockLatency));
	},
	fetchNodeCount: () => {
		dispatch(fetchNodeCount());
	},
});

export default connect(
	mapStateToProps,
	mapActionCreators
)(DExplorer);
