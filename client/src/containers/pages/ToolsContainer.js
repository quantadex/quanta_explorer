import { connect } from 'react-redux';
import Tools from '@quanta/components/pages/Tools';
import { generateKeys } from '@quanta/redux/actions/tools';

const mapStateToProps = state => ({
	keys: state.tools.keys,
});

const mapActionCreators = {
	generateKeys,
};

export default connect(
	mapStateToProps,
	mapActionCreators
)(Tools);
