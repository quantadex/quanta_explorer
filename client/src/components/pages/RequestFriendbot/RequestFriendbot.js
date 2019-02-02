import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Input } from 'reactstrap';
import { registerAccount } from './register.js'

import ToolsNavigation from '@quanta/components/common/ToolsNavigation';
import templateClasses from '@quanta/styles/template.scss';
import classes from './RequestFriendbot.scss';

class RequestFriendbot extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quantaAddress: '',
			username: '',
			processing: false,
		};
	}
	onRequest = () => {
		const { username, quantaAddress } = this.state;
		// window.location.href = `${
		// 	CONFIG.ENVIRONMENT.SERVERS[environmentType.value].REQUEST_FRIENDBOT
		// 	}?addr=${quantaAddress}`;

		this.setState({ processing: true })
		registerAccount(username.toLowerCase(), quantaAddress).then(res => {
			this.setState({ error: false, registered: true })
		}).catch(res => {
			var msg;
			if (res.message.includes("already exists")) {
				msg = "Username already exist"
			} else if (res.message.includes("is_valid_name")) {
				msg = "Invalid name: Use only alpha numeric, dash, and dot"
			} else if (res.message.includes("authority.key_auths")) {
				msg = "Invalid Address"
			} else {
				msg = "Server error. Please try again."
			}
			this.setState({
				error: true,
				message: msg
			});
		}).finally(e => {
			this.setState({ processing: false })
		});
	};

	onChangeQuantaAddress = event => {
		const { value } = event.target;

		if (this.state.registered) {
			this.setState({
				registered: false,
			});
		}

		this.setState({
			quantaAddress: value,
		});
	};

	onChangeUsername = event => {
		const { value } = event.target;

		if (this.state.registered) {
			this.setState({
				registered: false,
			});
		}

		this.setState({
			username: value,
		});
	};

	render() {
		const { username, quantaAddress } = this.state;
		return (
			<div className={classNames(templateClasses.main, 'd-flex', classes.tools)}>
				<ToolsNavigation className="hidden-sm" />
				<div className={classes.content}>
					<h2>Request Friendbot</h2>
					<div className={classes.description}>
						Activate your QUANTA account by requesting friendbot for QDEX tokens.
					</div>
					<div className={classes.quantaAddress}>Username</div>
					<Input
						className={classes.quantaAddressInput}
						type="text"
						value={username}
						onChange={this.onChangeUsername}
						placeholder="Enter your username"
					/>
					<div className={classes.quantaAddress}>QUANTA Address</div>
					<Input
						className={classes.quantaAddressInput}
						type="text"
						value={quantaAddress}
						onChange={this.onChangeQuantaAddress}
						placeholder="Example:  QBS4…. 6S3K"
					/>
					<Button color="primary" onClick={this.onRequest} disabled={this.state.processing || this.state.registered || this.state.quantaAddress.length === 0 || this.state.username.length === 0}>
						{this.state.processing ? "Requesting..." : this.state.registered ? "Activated" : "Request"}
					</Button> <span className={classes.error} hidden={!this.state.error}>{this.state.message}</span>
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
