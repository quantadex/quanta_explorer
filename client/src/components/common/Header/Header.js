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
		if (searchKey.match(/\d+.\d+.\d+/g)) {
			history.push(`/object/${searchKey}`);
		} else {
			history.push(`/account/${searchKey}`);
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
		this.props.history.push(params.join('/'))
	}

	render() {
		const { environmentType, searchKey } = this.props;
		const net_params = this.props.match.params.network
		const network = net_params ? { value: net_params, label: net_params } : { value: "testnet", label: "testnet" }
		const Menu = (prop) => {
			return (
				<div className={classNames(classes.menu, prop.className)}>
					More
					<div className={classes.menuItems}>
						<a href="/tools">Tools</a><br />
						<a href="/witness">Witnesses</a><br />
						<a href="/committee">Committee</a><br />
						<a className="show-sm" href="/crosschain/node1/1">Crosschain</a>
					</div>
				</div>
			)
		}

		return (
			<div className={classes.header}>
				<div className={classes.details}>
					<a href="/">
						<img src={Logo} alt="logo" />
					</a>
					<Menu className="show-sm mr-4" />
					<QuantaSelect
						isSearchable={false}
						options={CONFIG.ENVIRONMENT.TYPE.map(environment => ({
							value: environment,
							label: environment,
						}))}
						// value={{}}
						className={classes.category}
						onChange={this.changeEnvironment}
					/>
					<a className="hidden-sm ml-4" href="/crosschain/node1/1">Crosschain</a>
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
