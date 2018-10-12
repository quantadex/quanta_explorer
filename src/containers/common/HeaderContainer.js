import { connect } from 'react-redux';
import { changeEnvironmentType } from '@quanta/redux/actions/header';

import Header from '../../components/common/Header';

const mapActionCreators = {
	changeEnvironmentType,
};

const mapStateToProps = state => ({
	environmentType: state.header.environmentType,
});

export default connect(
	mapStateToProps,
	mapActionCreators
)(Header);
