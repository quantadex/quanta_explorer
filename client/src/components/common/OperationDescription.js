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
					{` for ${operation.asset_type} ${operation.amount}`}
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
		case 'path_payment':
			return 'Path Payment';
		case 'manage_offer':
			return 'Manage Offer';
		case 'create_passive_offer':
			return `Create Passive Offer`;
		case 'set_options':
			return 'Set Options';
		case 'allow_trust':
			return 'Allow Trust';
		case 'inflation':
			return 'Inflation';
		case 'manage_data':
			return (
				<React.Fragment>
					<QuantaAddress address={operation.source_account} />
					{` updated data ${operation.name} to ${operation.value}`}
				</React.Fragment>
			);
		case 'bump_sequence':
			return (
				<React.Fragment>
					<QuantaAddress address={operation.source_account} />
					{` called Bump Sequence`};
				</React.Fragment>
			);
		default:
			return operation.type;
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
