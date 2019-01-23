import React from 'react';
import PropTypes from 'prop-types';

function AssetSymbol(id) {
	return window.assets[id].symbol
}

function AssetPrecision(id) {
	return window.assets[id].precision
}

function getDescription(op) {
	switch (op.type) {
		case 0:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> sent&nbsp;
					{op.data.amount.amount / Math.pow(10, AssetPrecision(op.data.amount.asset_id))} {AssetSymbol(op.data.amount.asset_id)} to&nbsp;
					<a href={"/account/" + op.name2}>{op.name2}</a>
				</React.Fragment>
			);
		case 1:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> wants&nbsp;
					{op.data.min_to_receive.amount / Math.pow(10, AssetPrecision(op.data.min_to_receive.asset_id))}&nbsp;
					{AssetSymbol(op.data.min_to_receive.asset_id)} for&nbsp;
					{op.data.amount_to_sell.amount / Math.pow(10, AssetPrecision(op.data.amount_to_sell.asset_id))}&nbsp;
					{AssetSymbol(op.data.amount_to_sell.asset_id)}
				</React.Fragment>
			);
		case 2:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> cancel order
				</React.Fragment>
			)
		case 3:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> update debt/collateral for&nbsp;
					{AssetSymbol(op.data.delta_collateral.asset_id)}/{AssetSymbol(op.data.delta_debt.asset_id)}
				</React.Fragment>
			)
		case 4:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> paid&nbsp;
					{op.data.pays.amount / Math.pow(10, AssetPrecision(op.data.pays.asset_id))} {AssetSymbol(op.data.pays.asset_id)} for&nbsp;
					{op.data.receives.amount / Math.pow(10, AssetPrecision(op.data.receives.asset_id))} {AssetSymbol(op.data.receives.asset_id)}
				</React.Fragment>
			);
		case 5:
			const Text = () => {
				return (<React.Fragment>
					&nbsp;thanks to <a href={"/account/" + op.name2}>{op.name2}</a>
				</React.Fragment >
				)
			}
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> register <a href={"/account/" + op.data.name}>{op.data.name}</a>
					{op.name1 !== op.name2 ? <Text /> : ""}
				</React.Fragment >
			);
		case 6:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> updated account data
				</React.Fragment>
			);
		case 14:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> issued&nbsp;
					{op.data.asset_to_issue.amount / Math.pow(10, AssetPrecision(op.data.asset_to_issue.asset_id))} {AssetSymbol(op.data.asset_to_issue.asset_id)} to&nbsp;
					<a href={"/account/" + op.name2}>{op.name2}</a>
				</React.Fragment>
			);
		case 15:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> burned(reserved)&nbsp;
					{op.data.amount_to_reserve.amount / Math.pow(10, AssetPrecision(op.data.amount_to_reserve.asset_id))} {AssetSymbol(op.data.amount_to_reserve.asset_id)}
				</React.Fragment>
			);
		case 19:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> published feed for {AssetSymbol(op.data.asset_id)}
				</React.Fragment>
			);
		case 22:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> created a proposal
				</React.Fragment>
			);
		case 23:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> updated proposal {op.data.proposal}
				</React.Fragment>
			);
		case 33:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> withdrew vesting balance of&nbsp;
					{op.data.amount.amount / Math.pow(10, AssetPrecision(op.data.amount.asset_id))} {AssetSymbol(op.data.amount.asset_id)}
				</React.Fragment>
			);
		case 37:
			return (
				<React.Fragment>
					<a href={"/account/" + op.name1}>{op.name1}</a> claimed a balance of&nbsp;
					{op.data.total_claimed.amount / Math.pow(10, AssetPrecision(op.data.total_claimed.asset_id))} {AssetSymbol(op.data.total_claimed.asset_id)}
				</React.Fragment>
			);

		default:
			// console.log(op)
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
