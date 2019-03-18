import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { trimAccountId } from '@quanta/helpers/string';
import CONFIG from '@quanta/config';
import classes from './QuantaAddress.scss';

const renderString = (address, showOriginal) => {
	switch (address) {
		case CONFIG.SETTINGS.QUANTA_ISSUER:
			return 'QUANTA ISSUER';
		case CONFIG.SETTINGS.QUANTA_ORDERBOOK:
			return 'QUANTA ORDERBOOK';
		default:
			return showOriginal ? address : trimAccountId(address);
	}
};

const QuantaAddress = ({ address, env, className, showOriginal, isLong }) => (
	<React.Fragment>
		<a
			href={`/${env}/account/${address}`}
			className={classNames(
				{
					[className]: !(
						address === CONFIG.SETTINGS.QUANTA_ISSUER ||
						address === CONFIG.SETTINGS.QUANTA_ORDERBOOK
					),
				},
				{ [classes.isLong]: isLong },
				{
					[classes.hasBorder]:
						address === CONFIG.SETTINGS.QUANTA_ISSUER ||
						address === CONFIG.SETTINGS.QUANTA_ORDERBOOK,
				}
			)}
		>
			{renderString(address, showOriginal)}
		</a>
	</React.Fragment>
);

const { string, bool } = PropTypes;

QuantaAddress.propTypes = {
	address: string.isRequired,
	className: string,
	showOriginal: bool,
	isLong: bool,
};

QuantaAddress.defaultProps = {
	className: '',
	showOriginal: false,
	isLong: false,
};

export default QuantaAddress;
