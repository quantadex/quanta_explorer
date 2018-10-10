import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Table } from 'reactstrap';

import classes from './DExplorer.scss';

class DExplorer extends Component {
	componentDidMount() {
		const { fetchOperations, fetchLedgers } = this.props;
		fetchOperations();
		fetchLedgers();
	}

	renderOperationsRecord = () => {
		const { operations } = this.props;
		return (
			<tbody>
				{operations.map(operation => (
					<tr>
						<td>
							<a href={`/operation/${operation.id}`}>{operation.id}</a>
						</td>
						<td>{`Payment from ${operation.from} to ${operation.to} amout ${
							operation.amount
						}`}</td>
						<td />
					</tr>
				))}
			</tbody>
		);
	};

	renderOprationsHistory = () => {
		return (
			<div className={classNames(classes.history, classes.operationHistory)}>
				<div className={classes.header}>
					<h2>Operations History</h2>
					<Button outline color="primary">
						View All
					</Button>
				</div>
				<Table responsive>
					<thead>
						<tr>
							<th>Id</th>
							<th />
							<th>Created</th>
						</tr>
					</thead>
					{this.renderOperationsRecord()}
				</Table>
			</div>
		);
	};

	renderLedgerHistory = () => {
		return (
			<div className={classes.history}>
				<div className={classes.header}>
					<h2>Ledger History</h2>
					<Button outline color="primary">
						View All
					</Button>
				</div>
				<Table responsive>
					<thead>
						<tr>
							<th>Sequence</th>
							<th>Transactions</th>
							<th>Operations</th>
							<th>Created</th>
						</tr>
					</thead>
				</Table>
			</div>
		);
	};

	render() {
		return (
			<div>
				<div className={classes.details}>
					<div className={classes.content}>
						<div className={classes.item}>
							Highest Block
							<div className={classes.value}>20284138</div>
						</div>
						<div className={classes.item}>
							Average Block Latency
							<div className={classes.value}>790ms</div>
						</div>
						<div className={classes.item}>
							Number of Nodes
							<div className={classes.value}>21</div>
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

const { func, arrayOf, object } = PropTypes;
DExplorer.propTypes = {
	fetchOperations: func.isRequired,
	fetchLedgers: func.isRequired,
	operations: arrayOf(object).isRequired,
};

export default DExplorer;
