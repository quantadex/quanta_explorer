import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { Button } from 'reactstrap';

import CONFIG from '@quanta/config';
import { timeDiff } from '@quanta/helpers/utils';
import tableClasses from '@quanta/styles/tables.scss';
import classes from './Ledgers.scss';

class Ledgers extends Component {
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
		const { fetchLedgers, fetchMetrics, fetchNodeCount, fetchAllLedgers } = this.props;
		fetchLedgers();
		fetchAllLedgers({ limit: 15, order: 'desc' });
		fetchNodeCount();
		fetchMetrics();

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

	onNext = () => {
		const { allLinks, fetchAllLedgers } = this.props;
		fetchAllLedgers({ url: allLinks.next.href });
	};

	onPrev = () => {
		const { allLinks, fetchAllLedgers } = this.props;
		fetchAllLedgers({ url: allLinks.prev.href });
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

	renderLedgerHistory = () => (
		<div className="hidden">
			<div className={classes.header}>
				<h2>Ledger History</h2>
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

	renderAllLedgers = () => {
		const { allLedgers, allLinks } = this.props;
		return (
			<div className={classes.history}>
				<h2>Ledger History</h2>
				<div className={tableClasses.table}>
					<div className={tableClasses.header}>
						<div className={classes.sequence}>Sequence</div>
						<div className={classes.transactions}>Transactions</div>
						<div className={classes.operations}>Operations</div>
						<div className={classes.created}>Created</div>
					</div>
					{this.renderLedgersRecord(allLedgers)}
				</div>
				<div className={tableClasses.footer}>
					<Button
						color="primary"
						className={classNames(tableClasses.prevButton, 'hidden-sm')}
						onClick={this.onPrev}
						disabled={!allLinks.prev}
					>
						Prev
					</Button>
					<Button
						color="primary"
						className={classNames(tableClasses.prevButton, 'show-sm')}
						onClick={this.onPrev}
						disabled={!allLinks.prev}
						size="sm"
					>
						Prev
					</Button>
					<Button
						color="primary"
						className="hidden-sm"
						onClick={this.onNext}
						disabled={!allLinks.next}
					>
						Next
					</Button>
					<Button
						color="primary"
						className="show-sm"
						onClick={this.onNext}
						disabled={!allLinks.next}
						size="sm"
					>
						Next
					</Button>
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
					{this.renderAllLedgers()}
					{this.renderLedgerHistory()}
				</div>
			</React.Fragment>
		);
	}
}

const { func, arrayOf, object, shape, number } = PropTypes;
Ledgers.propTypes = {
	fetchLedgers: func.isRequired,
	fetchAllLedgers: func.isRequired,
	fetchMetrics: func.isRequired,
	setAverageBlockLatency: func.isRequired,
	fetchNodeCount: func.isRequired,
	ledgers: arrayOf(object).isRequired,
	allLedgers: arrayOf(object).isRequired,
	allLinks: shape({}).isRequired,
	metrics: shape({}).isRequired,
	averageBlockLatency: number.isRequired,
	nodeCount: number.isRequired,
};
export default Ledgers;
