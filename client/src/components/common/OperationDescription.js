import React from 'react';
import PropTypes from 'prop-types';

import QuantaAddress from '@quanta/components/common/QuantaAddress';
import CONFIG from '@quanta/config';

const getDescription = operation => {
	switch (operation.type) {
		case 'create_account':
			return (
				<React.Fragment>
					<QuantaAddress address={operation.account} />
					{`account funded with ${operation.starting_balance} ${
						CONFIG.SETTINGS.ASSET_TYPE_NATIVE
					}`}
				</React.Fragment>
			);
		case 'payment':
			return (
				<React.Fragment>
					Payment from <QuantaAddress address={operation.from} /> to{' '}
					<QuantaAddress address={operation.to} />
					{` for ${operation.asset_code} ${operation.amount}`}
				</React.Fragment>
			);
		case 'change_trust':
			if (parseFloat(operation.limit) === 0) {
				return `Trustline deleted for asset ${operation.asset_code}`;
			}
			return `Trustline updated for asset ${operation.asset_code} LIMIT ${operation.limit}`;
		case 'account_merge':
			return (
				<React.Fragment>
					<QuantaAddress address={operation.account} />
					{` merged with `}
					<QuantaAddress address={operation.into} />
				</React.Fragment>
			);
		case 'manage_data':
			return (
				<React.Fragment>
					<QuantaAddress address={operation.source_account} />
					{` updated data ${operation.name} to ${operation.value}`}
				</React.Fragment>
			);
		default:
			return (
				<React.Fragment>
					<QuantaAddress address={operation.source_account} />
					{` called ${operation.type}`};
				</React.Fragment>
			);
	}
};

const OperationDescription = ({ operation }) => (
	<React.Fragment>{getDescription(operation)}</React.Fragment>
);

const { shape } = PropTypes;

OperationDescription.propTypes = {
	operation: shape({}).isRequired,
};

export default OperationDescription;
