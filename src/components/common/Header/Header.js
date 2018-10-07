import React from 'react';
import { Button, Input } from 'reactstrap';
import QuantaSelect from '@quanta/components/common/QuantaSelect';

import Logo from '@quanta/assets/images/logo.png';
import Search from '@quanta/assets/images/search.png';
import classes from './Header.scss';

const Header = () => (
	<div className={classes.header}>
		<div className={classes.details}>
			<img src={Logo} alt="logo" />
			<QuantaSelect
				isSearchable={false}
				options={[
					{
						value: 'Betanet',
						label: 'Betanet',
					},
					{
						value: 'Betanet1',
						label: 'Betanet1',
					},
				]}
				className={classes.category}
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

export default Header;
