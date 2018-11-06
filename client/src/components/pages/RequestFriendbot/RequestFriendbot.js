import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Input } from 'reactstrap';

import CONFIG from '@quanta/config';
import ToolsNavigation from '@quanta/components/common/ToolsNavigation';
import templateClasses from '@quanta/styles/template.scss';
import classes from './RequestFriendbot.scss';

class RequestFriendbot extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quantaAddress: '',
		};
	}
	onRequest = () => {
		const { environmentType } = this.props;
		const { quantaAddress } = this.state;
		window.location.href = `${
			CONFIG.ENVIRONMENT.SERVERS[environmentType.value].REQUEST_FRIENDBOT
		}?addr=${quantaAddress}`;
	};

	onChangeQuantaAddress = event => {
		const { value } = event.target;

		this.setState({
			quantaAddress: value,
		});
	};

	render() {
		const { quantaAddress } = this.state;
		return (
			<div className={classNames(templateClasses.main, 'd-flex', classes.tools)}>
				<ToolsNavigation className="hidden-sm" />
				<div className={classes.content}>
					<h2>Request Friendbot</h2>
					<div className={classes.description}>
						Activate your QUANTA account by requesting friendbot for QDEX tokens.
					</div>
					<div className={classes.quantaAddress}>QUANTA Address</div>
					<Input
						className={classes.quantaAddressInput}
						type="text"
						value={quantaAddress}
						onChange={this.onChangeQuantaAddress}
						placeholder="Example:  QBS4…. 6S3K"
					/>
					<Button color="primary" onClick={this.onRequest}>
						Request
					</Button>
				</div>
			</div>
		);
	}
}

const { shape } = PropTypes;

RequestFriendbot.propTypes = {
	environmentType: shape({}).isRequired,
};

export default RequestFriendbot;
