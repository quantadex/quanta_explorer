import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Input } from 'reactstrap';
import { PublicKey } from "@quantadex/bitsharesjs";
import ToolsNavigation from '@quanta/components/common/ToolsNavigation';
import templateClasses from '@quanta/styles/template.scss';
import classes from './RequestFriendbot.scss';
import config from '@quanta/config';

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

		if (!PublicKey.fromPublicKeyString(quantaAddress)) {
			this.setState({
				error: true,
				message: "Invalid Address"
			});
			return
		}

		fetch(config.getEnv().API_PATH + "register_account", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				name: username.toLowerCase(),
				public_key: quantaAddress,
			})
		}).then(response => {
			if (response.status == 200) {
				this.setState({ error: false, registered: true })
				return response.json()
			} else {
				return response.json().then(res => {
					var msg;
					if (res.error.includes("already exists")) {
						msg = "Username already exist"
					} else if (res.error.includes("is_valid_name")) {
						msg = "Name must start with a letter and only contains alpha numeric, dash, and dot"
					} else {
						msg = "Server error. Please try again."
					}
					this.setState({
						error: true,
						message: msg
					});
				});
			}
		}).finally(() => {
			this.setState({ processing: false })
		})
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
				<ToolsNavigation className="hidden-sm" network={this.props.match.params.network} />
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
						spellCheck="false"
						placeholder="Enter your username"
					/>
					<div className={classes.quantaAddress}>QUANTA Address</div>
					<Input
						className={classes.quantaAddressInput}
						type="text"
						value={quantaAddress}
						onChange={this.onChangeQuantaAddress}
						spellCheck="false"
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
