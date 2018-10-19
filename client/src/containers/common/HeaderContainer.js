import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeEnvironmentType, changeSearchKey } from '@quanta/redux/actions/header';

import Header from '../../components/common/Header';

const mapActionCreators = {
	changeEnvironmentType,
	changeSearchKey,
};

const mapStateToProps = state => ({
	environmentType: state.header.environmentType,
	searchKey: state.header.searchKey,
});

export default withRouter(
	connect(
		mapStateToProps,
		mapActionCreators
	)(Header)
);
