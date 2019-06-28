import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Input } from 'reactstrap';
import QuantaSelect from '@quanta/components/common/QuantaSelect';
import CONFIG from '@quanta/config';

import Logo from '@quanta/assets/images/logo.svg';
import classes from './Header.scss';

class Header extends React.PureComponent {
	onKeyChange = event => {
		const { changeSearchKey } = this.props;
		changeSearchKey({ searchKey: event.target.value });
	};

	onGo = () => {
		const { searchKey, history } = this.props;
		if (searchKey.trim().match(/\d+\.\d+\.\d+/g)) {
			history.push(`/${this.getEnv()}/object/${searchKey.trim()}`);
		} else {
			history.push(`/${this.getEnv()}/account/${searchKey.trim()}`);
		}
	};

	onKeyUp = event => {
		if (event.keyCode === 13) {
			this.onGo();
		}
	};

	changeEnvironment = (env) => {
		let params = this.props.location.pathname.split('/')
		params[1] = env.value
		// this.props.history.push(params.join('/'))
		window.location = params.join('/')
	}

	getEnv() {
		return this.props.location.pathname.startsWith("/testnet") ? "testnet" : "mainnet"
	}

	render() {
		const { searchKey } = this.props;
		const network = this.getEnv() == "testnet" ? { value: "testnet", label: "testnet" } : { value: "mainnet", label: "mainnet" }
		const Menu = (prop) => {
			return (
				<div className={classNames(classes.menu, prop.className)}>
					More
					<div className={classes.menuItems}>
						<a href={"/" + network.value + "/tools"}>Tools</a><br />
						<a href={"/" + network.value + "/assets"}>Assets</a><br />
						<a href={"/" + network.value + "/witness"}>Witnesses</a><br />
						<a href={"/" + network.value + "/committee"}>Committee</a><br />
						<a className="show-sm" href={"/" + network.value + "/crosschain/node1/1"}>Crosschain</a>
					</div>
				</div>
			)
		}

		return (
			<div className={classes.header}>
				<div className={classes.details}>
					<a href={"/" + network.value}>
						<img src={Logo} alt="logo" />
					</a>
					<Menu className="show-sm mr-4" />
					<QuantaSelect
						isSearchable={false}
						options={CONFIG.ENVIRONMENT.TYPE.map(environment => ({
							value: environment,
							label: environment,
						}))}
						value={network}
						className={classes.category + " text-capitalize"}
						onChange={this.changeEnvironment}
					/>
					<a className="hidden-sm ml-4" href={"/" + network.value + "/crosschain/node1/1"}>Crosschain</a>
					<Menu className="hidden-sm ml-4" />
				</div>
				<div className={classes.search}>
					<Input
						type="text"
						value={searchKey}
						spellCheck="false"
						placeholder="Search Account, Object"
						onChange={this.onKeyChange}
						onKeyUp={this.onKeyUp}
					/>
					<Button color="primary" onClick={this.onGo}>
						<span>Go</span>
					</Button>
				</div>
			</div>
		);
	}
}

const { shape, func, string } = PropTypes;

Header.propTypes = {
	environmentType: shape({}).isRequired,
	changeEnvironmentType: func.isRequired,
	changeSearchKey: func.isRequired,
	searchKey: string,
};

Header.defaultProps = {
	searchKey: '',
};

export default Header;
