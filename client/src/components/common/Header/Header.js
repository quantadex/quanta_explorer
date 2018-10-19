import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';
import QuantaSelect from '@quanta/components/common/QuantaSelect';
import CONFIG from '@quanta/config';

import Logo from '@quanta/assets/images/logo.svg';
import Search from '@quanta/assets/images/search.svg';
import classes from './Header.scss';

class Header extends React.PureComponent {
	onKeyChange = event => {
		const { changeSearchKey } = this.props;
		changeSearchKey({ searchKey: event.target.value });
	};

	onGo = () => {
		const { searchKey, history } = this.props;

		if (searchKey.startsWith(CONFIG.SETTINGS.ACCOUT_START_WITH)) {
			history.push(`/account/${searchKey}`);
		} else {
			history.push(`/transactions/${searchKey}`);
		}
	};

	render() {
		const { environmentType, changeEnvironmentType, searchKey } = this.props;
		return (
			<div className={classes.header}>
				<div className={classes.details}>
					<img src={Logo} alt="logo" />
					<QuantaSelect
						isSearchable={false}
						options={CONFIG.ENVIRONMENT.TYPE.map(environment => ({
							value: environment,
							label: environment,
						}))}
						value={environmentType}
						className={classes.category}
						onChange={changeEnvironmentType}
					/>
				</div>
				<div className={classes.search}>
					<Input
						type="text"
						value={searchKey}
						placeholder="Address, Account or Transaction"
						onChange={this.onKeyChange}
					/>
					<Button color="primary" onClick={this.onGo}>
						<img src={Search} alt="search" />
						<span>Search</span>
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
