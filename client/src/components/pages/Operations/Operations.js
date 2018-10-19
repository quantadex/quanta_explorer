import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactEventSource from 'react-eventsource';
import { Button } from 'reactstrap';
import urlParse from 'url-parse';

import CONFIG from '@quanta/config';
import OperationDescription from '@quanta/components/common/OperationDescription';
import { timeDiff } from '@quanta/helpers/utils';
import tableClasses from '@quanta/styles/tables.scss';
import operationsClasses from '@quanta/styles/operations.scss';
import classes from './Operations.scss';

class Operations extends Component {
	componentDidMount() {
		const { fetchOperations, fetchLedgers, fetchMetrics, fetchNodeCount } = this.props;
		fetchOperations({ limit: 15, order: 'desc' });
		fetchLedgers();
		fetchMetrics();
		fetchNodeCount();

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

	onNext = () => {
		const { links, fetchOperations } = this.props;
		fetchOperations({ url: links.next.href });
	};

	onPrev = () => {
		const { links, fetchOperations } = this.props;
		fetchOperations({ url: links.prev.href });
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
							<div className={operationsClasses.created}>{`<  ${Math.ceil(
								timeDiff(operation.created_at)
							)} min ago`}</div>
						</div>
						<div className={classNames(tableClasses.body, 'show-sm', 'flex-column')}>
							<div className="d-flex justify-content-between w-100">
								<a
									href={urlParse(operation._links.transaction.href).pathname}
									className={operationsClasses.id}
								>
									{operation.id}
								</a>
								<div className={operationsClasses.created}>{`<  ${Math.ceil(
									timeDiff(operation.created_at)
								)} min ago`}</div>
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
					<div key={ledger.id}>
						<a href={`/ledgers/${ledger.sequence}`}>{ledger.sequence}</a>
						<div>{ledger.transaction_count}</div>
						<div>{ledger.operation_count}</div>
						<div>{`<  ${Math.ceil(timeDiff(ledger.closed_at))} min ago`}</div>
					</div>
				))}
			</React.Fragment>
		);
	};

	renderOprationsHistory = () => {
		const { operations, links } = this.props;
		return (
			<div className={classNames(operationsClasses.history, classes.operationHistory)}>
				<h2>Operations History</h2>
				<div className={tableClasses.table}>
					<div className={classNames(tableClasses.header, 'hidden-sm')}>
						<div className={operationsClasses.id}>Id</div>
						<div className={operationsClasses.description} />
						<div className={operationsClasses.created}>Created</div>
					</div>
					{operations.length > 0 && this.renderOperationsRecord(operations)}
				</div>
				<div className={tableClasses.footer}>
					<Button
						color="primary"
						className={classNames(tableClasses.prevButton, 'hidden-sm')}
						onClick={this.onPrev}
						disabled={!links.prev}
					>
						Prev
					</Button>
					<Button
						color="primary"
						className={classNames(tableClasses.prevButton, 'show-sm')}
						onClick={this.onPrev}
						disabled={!links.prev}
						size="sm"
					>
						Prev
					</Button>
					<Button
						color="primary"
						className="hidden-sm"
						onClick={this.onNext}
						disabled={!links.next}
					>
						Next
					</Button>
					<Button
						color="primary"
						className="show-sm"
						onClick={this.onNext}
						disabled={!links.next}
						size="sm"
					>
						Next
					</Button>
				</div>
			</div>
		);
	};

	renderLedgerHistory = () => {
		const { ledgers } = this.props;

		return (
			<div className="hidden">
				<div>
					<h2>Ledger History</h2>
					<Button outline color="primary">
						View All
					</Button>
				</div>
				<div>
					<div>
						<div>Sequence</div>
						<div>Transactions</div>
						<div>Operations</div>
						<div>Created</div>
					</div>
					{ledgers.length > 0 &&
						this.ledgers && (
							<ReactEventSource
								url={`${
									CONFIG.ENVIRONMENT.HORIZON_SERVER
								}/ledgers?order=asc&cursor=now`}
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
									this.getBlockAverageLatency(
										totalLedgers.slice(0, CONFIG.SETTINGS.RECENT_ITEM_LENGTH)
									);
									return this.renderLedgersRecord(
										totalLedgers.slice(0, CONFIG.SETTINGS.RECENT_ITEM_LENGTH)
									);
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
Operations.propTypes = {
	fetchOperations: func.isRequired,
	fetchLedgers: func.isRequired,
	fetchMetrics: func.isRequired,
	setAverageBlockLatency: func.isRequired,
	fetchNodeCount: func.isRequired,
	operations: arrayOf(object).isRequired,
	links: shape({}).isRequired,
	ledgers: arrayOf(object).isRequired,
	metrics: shape({}).isRequired,
	averageBlockLatency: number.isRequired,
	nodeCount: number.isRequired,
};
export default Operations;
