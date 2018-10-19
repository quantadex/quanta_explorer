import { connect } from 'react-redux';
import { fetchLedgers, fetchAllLedgers } from '@quanta/redux/actions/ledgers';
import { fetchMetrics } from '@quanta/redux/actions/metrics';
import { setAverageBlockLatency, fetchNodeCount } from '@quanta/redux/actions/global';
import { SETTINGS } from '@quanta/config';
import Ledgers from '@quanta/components/pages/Ledgers';

const mapStateToProps = state => ({
	ledgers: state.ledgers.ledgers,
	allLedgers: state.ledgers.allLedgers.ledgers,
	allLinks: state.ledgers.allLedgers.links,
	metrics: state.metrics.metrics,
	averageBlockLatency: state.global.averageBlockLatency,
	nodeCount: state.global.nodeCount,
});

const mapActionCreators = dispatch => ({
	fetchLedgers: () => {
		dispatch(fetchLedgers({ limit: SETTINGS.RECENT_ITEM_LENGTH, order: 'desc' }));
	},
	fetchAllLedgers: params => {
		dispatch(fetchAllLedgers(params));
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
)(Ledgers);
