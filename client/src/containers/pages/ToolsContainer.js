import { connect } from 'react-redux';
import GenerateKeys from '@quanta/components/pages/GenerateKeys';
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
)(GenerateKeys);
