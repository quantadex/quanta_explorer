import React from 'react';
import PropTypes from 'prop-types';

import QuantaAddress from '@quanta/components/common/QuantaAddress';
import CONFIG from '@quanta/config';
import QuantaAsset from '@quanta/components/common/QuantaAsset.js';

function getDescription(data) {
	switch (data.type) {
		case 1:
			return (
				<React.Fragment>
					<a href={"/account/" + data.names[data.data.seller]}>{data.names[data.data.seller]}</a> wants&nbsp;
					{data.data.min_to_receive.amount / Math.pow(10, window.assets[data.data.min_to_receive.asset_id].precision)}
					&nbsp;{window.assets[data.data.min_to_receive.asset_id].symbol} for&nbsp;
					{data.data.amount_to_sell.amount / Math.pow(10, window.assets[data.data.amount_to_sell.asset_id].precision)}
					&nbsp;{window.assets[data.data.amount_to_sell.asset_id].symbol}
				</React.Fragment>
			);


		default:
			return (
				<React.Fragment>
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
