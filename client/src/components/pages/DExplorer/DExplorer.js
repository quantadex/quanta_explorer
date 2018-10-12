import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactEventSource from 'react-eventsource';
import { Button } from 'reactstrap';

import CONFIG from '@quanta/config';
import { trimAccountId } from '@quanta/helpers/string';
import { timeDiff } from '@quanta/helpers/utils';
import tableClasses from '@quanta/styles/tables.scss';
import classes from './DExplorer.scss';

class DExplorer extends Component {
	componentDidMount() {
		const { fetchOperations, fetchLedgers, fetchMetrics, fetchNodeCount } = this.props;
		fetchOperations();
		fetchLedgers();
		fetchMetrics();
		fetchNodeCount();

		this.operations = [];
		this.ledgers = [];
	}

	getBlockAverageLatency = ledgers => {
		const { setAverageBlockLatency } = this.props;

		let totalLatency = 0;
		ledgers.forEach((ledger, index) => {
			if (index === ledgers.length - 1) {
				return;
			}
			totalLatency += timeDiff(ledgers[index + 1].closed_at, 'ms', ledger.closed_at);
		});
		setAverageBlockLatency(Math.round(totalLatency / (ledgers.length - 1)));
	};

	getDescription = operation => {
		switch (operation.type) {
			case 'create_account':
				return `${trimAccountId(operation.account)} account funded with ${
					operation.starting_balance
				} ${CONFIG.ASSET_TYPE_NATIVE}`;
			case 'payment':
				return `Payment from ${trimAccountId(operation.from)} to ${trimAccountId(
					operation.to
				)} for ${CONFIG.ASSET_TYPE_NATIVE} ${operation.amount}`;
			case 'change_trust':
				if (parseFloat(operation.limit) === 0) {
					return 'Trustline deleted for asset ';
				}
				return `Trustline updated for asset LIMIT ${operation.limit}`;
			case 'account_merge':
				return `${trimAccountId(operation.account)} merged with ${trimAccountId(
					operation.into
				)}`;
			case 'path_payment':
				return 'Path Payment';
			case 'manage_offer':
				return 'Manage Offer';
			case 'create_passive_offer':
				return 'Create Passive Offer';
			case 'set_options':
				return 'Set Options';
			case 'allow_trust':
				return 'Allow Trust';
			case 'inflation':
				return 'Inflation';
			case 'manage_data':
				return 'Manage Data';
			case 'bump_sequence':
				return 'Bump Sequence';
			default:
				return operation.type;
		}
	};

	renderOperationsRecord = operations => {
		return (
			<React.Fragment>
				{operations.map(operation => (
					<React.Fragment key={operation.id}>
						<div className={classNames(tableClasses.body, 'hidden-sm')}>
							<a href={`/operation/${operation.id}`} className={classes.id}>
								{operation.id}
							</a>
							<div className={classes.description}>
								{this.getDescription(operation)}
							</div>
							<div className={classes.created}>{`<  ${Math.ceil(
								timeDiff(operation.created_at)
							)} min ago`}</div>
						</div>
						<div className={classNames(tableClasses.body, 'show-sm', 'flex-column')}>
							<div className="d-flex justify-content-between w-100">
								<a href={`/operation/${operation.id}`} className={classes.id}>
									{operation.id}
								</a>
								<div className={classes.created}>{`<  ${Math.ceil(
									timeDiff(operation.created_at)
								)} min ago`}</div>
							</div>
							<div className={classes.description}>
								{this.getDescription(operation)}
							</div>
						</div>
					</React.Fragment>
				))}
			</React.Fragment>
		);
	};

	renderLedgersRecord = ledgers => {
		return (
			<React.Fragment>
				{ledgers.map(ledger => (
					<div key={ledger.id} className={tableClasses.body}>
						<a href={`/ledger/${ledger.id}`} className={classes.sequence}>
							{ledger.sequence}
						</a>
						<div className={classes.transactions}>{ledger.transaction_count}</div>
						<div className={classes.operations}>{ledger.operation_count}</div>
						<div className={classes.created}>{`<  ${Math.ceil(
							timeDiff(ledger.closed_at)
						)} min ago`}</div>
					</div>
				))}
			</React.Fragment>
		);
	};

	renderOprationsHistory = () => {
		const { operations } = this.props;
		return (
			<div className={classNames(classes.history, classes.operationHistory)}>
				<div className={classes.header}>
					<h2>Operations History</h2>
					<Button outline color="primary">
						View All
					</Button>
				</div>
				<div className={tableClasses.table}>
					<div className={classNames(tableClasses.header, 'hidden-sm')}>
						<div className={classes.id}>Id</div>
						<div className={classes.description} />
						<div className={classes.created}>Created</div>
					</div>
					{operations.length > 0 && (
						<ReactEventSource
							url={`${CONFIG.HORIZON_SERVER}/operations?order=asc&cursor=now`}
						>
							{events => {
								const streamOperations = events
									.map(event => JSON.parse(event))
									.sort((a, b) => timeDiff(a.created_at, 'ms', b.created_at));
								const streamOperationIds = streamOperations.map(
									operation => operation.id
								);

								if (this.operations.length === 0) {
									this.operations = operations;
								}

								const totalOperations = [
									...streamOperations,
									...this.operations.filter(
										operation => !streamOperationIds.includes(operation.id)
									),
								].sort((a, b) => timeDiff(a.created_at, 'ms', b.created_at));
								return this.renderOperationsRecord(totalOperations.slice(0, 8));
							}}
						</ReactEventSource>
					)}
				</div>
			</div>
		);
	};

	renderLedgerHistory = () => {
		const { ledgers } = this.props;

		return (
			<div className={classNames(classes.history)}>
				<div className={classes.header}>
					<h2>Ledger History</h2>
					<Button outline color="primary">
						View All
					</Button>
				</div>
				<div className={tableClasses.table}>
					<div className={tableClasses.header}>
						<div className={classes.sequence}>Sequence</div>
						<div className={classes.transactions}>Transactions</div>
						<div className={classes.operations}>Operations</div>
						<div className={classes.created}>Created</div>
					</div>
					{ledgers.length > 0 && (
						<ReactEventSource
							url={`${CONFIG.HORIZON_SERVER}/ledgers?order=asc&cursor=now`}
						>
							{events => {
								const streamLedgers = events
									.map(event => JSON.parse(event))
									.sort((a, b) => timeDiff(a.closed_at, 'ms', b.closed_at));
								const streamLedgerIds = streamLedgers.map(
									operation => operation.id
								);

								if (this.ledgers.length === 0) {
									this.ledgers = ledgers;
								}

								const totalLedgers = [
									...streamLedgers,
									...this.ledgers.filter(
										operation => !streamLedgerIds.includes(operation.id)
									),
								].sort((a, b) => timeDiff(a.closed_at, 'ms', b.closed_at));
								this.getBlockAverageLatency(totalLedgers.slice(0, 8));
								return this.renderLedgersRecord(totalLedgers.slice(0, 8));
							}}
						</ReactEventSource>
					)}
				</div>
			</div>
		);
	};

	render() {
		const { metrics, averageBlockLatency, nodeCount } = this.props;
		return (
			<div>
				<div className={classes.details}>
					<div className={classes.content}>
						<div className={classes.item}>
							Highest Block
							{metrics['history.latest_ledger'] && (
								<div className={classes.value}>
									{metrics['history.latest_ledger'].value}
								</div>
							)}
						</div>
						<div className={classes.item}>
							Average Block Latency
							<div className={classes.value}>{`${averageBlockLatency}ms`}</div>
						</div>
						<div className={classes.item}>
							Number of Nodes
							<div className={classes.value}>{nodeCount}</div>
						</div>
					</div>
				</div>
				<div className={classes.main}>
					{this.renderOprationsHistory()}
					{this.renderLedgerHistory()}
				</div>
			</div>
		);
	}
}

const { func, arrayOf, object, shape, number } = PropTypes;
DExplorer.propTypes = {
	fetchOperations: func.isRequired,
	fetchLedgers: func.isRequired,
	fetchMetrics: func.isRequired,
	setAverageBlockLatency: func.isRequired,
	fetchNodeCount: func.isRequired,
	operations: arrayOf(object).isRequired,
	ledgers: arrayOf(object).isRequired,
	metrics: shape({}).isRequired,
	averageBlockLatency: number.isRequired,
	nodeCount: number.isRequired,
};
export default DExplorer;
