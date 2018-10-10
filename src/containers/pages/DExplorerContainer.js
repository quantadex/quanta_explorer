import { connect } from 'react-redux';
import { fetchOperations } from '@quanta/redux/actions/operations';

import DExplorer from '../../components/pages/DExplorer';

const mapStateToProps = state => ({
	isFetching: state.operations.isFetching,
	operations: state.operations.operations,
});

const mapActionCreators = dispatch => ({
	fetchOperations: () => {
		dispatch(fetchOperations({ limit: 8 }));
	},
});

export default connect(
	mapStateToProps,
	mapActionCreators
)(DExplorer);
