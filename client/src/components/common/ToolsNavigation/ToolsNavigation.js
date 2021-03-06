import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import classes from './ToolsNavigation.scss';

const ToolsNavigation = ({ className, network }) => (
	<div className={classNames(classes.toolsNavigation, className)}>
		<h2>Tools</h2>
		<Link to={"/" + network + "/tools/generate_keys"}>Generate Keys</Link>
		<Link to={"/" + network + "/tools/deploy_crosschain"}>Deploy Crosschain Ethereum</Link>
		<Link to={"/" + network + "/tools/request_friendbot"}>Request Friendbot</Link>
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
