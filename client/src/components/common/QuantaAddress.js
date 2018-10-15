import React from 'react';
import PropTypes from 'prop-types';
import { trimAccountId } from '@quanta/helpers/string';
import CONFIG from '@quanta/config';

const QuantaAddress = ({ address, className }) => (
	<React.Fragment>
		<a href={`/account/${address}`} className={className}>
			{trimAccountId(address)}
		</a>
		{address === CONFIG.QUANTA_ISSUER && ' [QUANTA ISSUER]'}
	</React.Fragment>
);

const { string } = PropTypes;

QuantaAddress.propTypes = {
	address: string.isRequired,
	className: string,
};

QuantaAddress.defaultProps = {
	className: '',
};

export default QuantaAddress;
