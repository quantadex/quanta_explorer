import { connect } from 'react-redux';
import { fetchOperations } from '@quanta/redux/actions/operations';
import { fetchLedgers } from '@quanta/redux/actions/ledgers';
import { fetchMetrics } from '@quanta/redux/actions/metrics';
import { setAverageBlockLatency } from '@quanta/redux/actions/global';
import DExplorer from '../../components/pages/DExplorer';

const mapStateToProps = state => ({
	operations: state.operations.operations,
	ledgers: state.ledgers.ledgers,
	metrics: state.metrics.metrics,
	averageBlockLatency: state.global.averageBlockLatency,
});

const mapActionCreators = dispatch => ({
	fetchOperations: () => {
		dispatch(fetchOperations({ limit: 8, order: 'desc' }));
	},
	fetchLedgers: () => {
		dispatch(fetchLedgers({ limit: 8, order: 'desc' }));
	},
	fetchMetrics: () => {
		dispatch(fetchMetrics());
	},
	setAverageBlockLatency: averageBlockLatency => {
		dispatch(setAverageBlockLatency(averageBlockLatency));
	},
});

export default connect(
	mapStateToProps,
	mapActionCreators
)(DExplorer);
