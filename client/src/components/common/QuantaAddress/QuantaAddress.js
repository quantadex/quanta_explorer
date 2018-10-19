import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { trimAccountId } from '@quanta/helpers/string';
import CONFIG from '@quanta/config';
import classes from './QuantaAddress.scss';

const QuantaAddress = ({ address, className, showOriginal, isLong }) => (
	<React.Fragment>
		<a
			href={`/account/${address}`}
			className={classNames(className, { [classes.isLong]: isLong })}
		>
			{showOriginal ? address : trimAccountId(address)}
		</a>
		{address === CONFIG.QUANTA_ISSUER && ' [QUANTA ISSUER]'}
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
