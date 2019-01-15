import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import ReactEventSource from 'react-eventsource';
import { Button } from 'reactstrap';
import urlParse from 'url-parse';

import CONFIG from '@quanta/config';
import OperationDescription from '@quanta/components/common/OperationDescription';
import { timeDiff } from '@quanta/helpers/utils';
import tableClasses from '@quanta/styles/tables.scss';
import operationsClasses from '@quanta/styles/operations.scss';
import classes from './DExplorer.scss';

class DExplorer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ledgersSource: new EventSource(
				`${CONFIG.ENVIRONMENT.HORIZON_SERVER}/ledgers?order=asc&cursor=now`
			),
			ledgers: props.ledgers || [],
		};
	}

	componentDidMount() {
		const { fetchOperations, fetchLedgers, fetchMetrics, fetchNodeCount } = this.props;
		fetchOperations();
		fetchLedgers();
		fetchMetrics();
		fetchNodeCount();

		this.operations = [];

		this.state.ledgersSource.addEventListener(['message'], message => {
			const { ledgers } = this.state;
			if (this.state.ledgers.length > 0) {
				ledgers.unshift(JSON.parse(message.data));
				this.getBlockAverageLatency();
				fetchMetrics();
				this.setState({
					ledgers: ledgers.slice(0, CONFIG.SETTINGS.RECENT_ITEM_LENGTH),
				});
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.ledgers !== nextProps.ledgers) {
			this.setState(
				{
					ledgers: nextProps.ledgers.sort((a, b) =>
						timeDiff(a.closed_at, 'ms', b.closed_at)
					),
				},
				() => {
					this.getBlockAverageLatency();
				}
			);
		}
	}

	async randomFunc() {
		await new Promise((res, rej) => {
			// test
			res()
		})
	}

	getBlockAverageLatency = () => {
		const { setAverageBlockLatency } = this.props;
		const { ledgers } = this.state;

		let totalLatency = 0;
		ledgers.forEach((ledger, index) => {
			if (index === ledgers.length - 1) {
				return;
			}
			totalLatency += timeDiff(ledgers[index + 1].closed_at, 'ms', ledger.closed_at);
		});
		setAverageBlockLatency(Math.round(totalLatency / (ledgers.length - 1)));
	};

	goToOperations = () => {
		const { history } = this.props;

		history.push('/operations');
	};

	goToLedgers = () => {
		const { history } = this.props;

		history.push('/ledgers');
	};

	renderOperationsRecord = operations => {
		return (
			<React.Fragment>
				{operations.map(operation => (
					<React.Fragment key={operation.id}>
						<div className={classNames(tableClasses.body, 'hidden-sm')}>
							<a
								href={urlParse(operation._links.transaction.href).pathname}
								className={operationsClasses.id}
							>
								{operation.id}
							</a>
							<div className={operationsClasses.description}>
								<OperationDescription operation={operation} />
							</div>
							<div className={operationsClasses.created}>{`< ${moment(
								operation.created_at
							).toNow(true)} ago`}</div>
						</div>
						<div className={classNames(tableClasses.body, 'show-sm', 'flex-column')}>
							<div className="d-flex justify-content-between w-100">
								<a
									href={urlParse(operation._links.transaction.href).pathname}
									className={operationsClasses.id}
								>
									{operation.id}
								</a>
								<div className={operationsClasses.created}>{`< ${moment(
									operation.created_at
								).toNow(true)} ago`}</div>
							</div>
							<div className={operationsClasses.description}>
								<OperationDescription operation={operation} />
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
						<a href={`/ledgers/${ledger.sequence}`} className={classes.sequence}>
							{ledger.sequence}
						</a>
						<div className={classes.transactions}>{ledger.transaction_count}</div>
						<div className={classes.operations}>{ledger.operation_count}</div>
						<div className={classes.created}>{`< ${moment(ledger.closed_at).toNow(
							true
						)} ago`}</div>
					</div>
				))}
			</React.Fragment>
		);
	};

	renderOprationsHistory = () => {
		const { operations } = this.props;
		return (
			<div className={classNames(operationsClasses.history, classes.operationHistory)}>
				<div className={operationsClasses.header}>
					<h2>Operations History</h2>
					<Button outline color="primary" onClick={this.goToOperations}>
						View All
					</Button>
				</div>
				<div className={tableClasses.table}>
					<div className={classNames(tableClasses.header, 'hidden-sm')}>
						<div className={operationsClasses.id}>Id</div>
						<div className={operationsClasses.description} />
						<div className={operationsClasses.created}>Created</div>
					</div>
					{operations.length > 0 &&
						this.operations && (
							<ReactEventSource
								url={`${
									CONFIG.ENVIRONMENT.HORIZON_SERVER
								}/operations?order=asc&cursor=now`}
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
									return this.renderOperationsRecord(
										totalOperations.slice(0, CONFIG.SETTINGS.RECENT_ITEM_LENGTH)
									);
								}}
							</ReactEventSource>
						)}
				</div>
			</div>
		);
	};

	renderLedgerHistory = () => (
		<div className={classes.history}>
			<div className={classes.header}>
				<h2>Ledger History</h2>
				<Button outline color="primary" onClick={this.goToLedgers}>
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
				{this.renderLedgersRecord(this.state.ledgers)}
			</div>
		</div>
	);

	render() {
		const { metrics, averageBlockLatency, nodeCount } = this.props;
		return (
			<React.Fragment>
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
			</React.Fragment>
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
