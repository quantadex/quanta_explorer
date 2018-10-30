import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import classes from './ToolsNavigation.scss';

const ToolsNavigation = ({ className }) => (
	<div className={classNames(classes.toolsNavigation, className)}>
		<h2>Tools</h2>
		<Link to="/tools/generate_keys">Generate Keys</Link>
		<Link to="/tools/deploy_crosschain">Deploy Crosschain Ethereum</Link>
		<Link to="/tools/request_friendbot">Request Friendbot</Link>
	</div>
);

const { string } = PropTypes;
ToolsNavigation.propTypes = {
	className: string,
};

ToolsNavigation.defaultProps = {
	className: '',
};

export default ToolsNavigation;
