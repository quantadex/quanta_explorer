import React from 'react';
import classNames from 'classnames';
import { Button, Table } from 'reactstrap';

import classes from './DExplorer.scss';

class DExplorer extends React.PureComponent {
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

export default DExplorer;
