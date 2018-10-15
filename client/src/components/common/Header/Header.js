import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';
import QuantaSelect from '@quanta/components/common/QuantaSelect';
import CONFIG from '@quanta/config';

import Logo from '@quanta/assets/images/logo.svg';
import Search from '@quanta/assets/images/search.svg';
import classes from './Header.scss';

const Header = ({ environmentType, changeEnvironmentType }) => (
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
			<Input type="text" placeholder="Address, Account or Transaction" />
			<Button color="primary">
				<img src={Search} alt="search" />
				<span>Search</span>
			</Button>
		</div>
	</div>
);

const { shape, func } = PropTypes;

Header.propTypes = {
	environmentType: shape({}).isRequired,
	changeEnvironmentType: func.isRequired,
};

export default Header;
