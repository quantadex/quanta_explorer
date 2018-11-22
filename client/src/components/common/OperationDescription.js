import React from 'react';
import PropTypes from 'prop-types';

import QuantaAddress from '@quanta/components/common/QuantaAddress';
import CONFIG from '@quanta/config';
import QuantaAsset from '@quanta/components/common/QuantaAsset.js';

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
		case 'settlement':
					if (operation.matched_orders && operation.matched_orders.length == 1) {						
						return (
							<React.Fragment>
								<b>Settled</b>{` between buyer `}<QuantaAddress address={operation.matched_orders[0].buyer} />{` ${operation.matched_orders[0].amount_buy} `}
								<QuantaAsset issuer={operation.matched_orders[0].buying_asset_issuer} code={operation.matched_orders[0].buying_asset_code} />
								{` and seller `}<QuantaAddress address={operation.matched_orders[0].seller} />{` ${operation.matched_orders[0].amount_sell} `}
								<QuantaAsset issuer={operation.matched_orders[0].selling_asset_issuer} code={operation.matched_orders[0].selling_asset_code} />
							</React.Fragment>
						);
					} if (operation.matched_orders && operation.matched_orders.length > 1) {
						return (<React.Fragment>Settled multiple orders.</React.Fragment>)
					}
				
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
