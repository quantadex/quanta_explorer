import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap';

import OperationDescription from '@quanta/components/common/OperationDescription';
import LabelText from '@quanta/components/common/LabelText';
import { dateToString, timeAgo, operationData } from '@quanta/helpers/utils';
import tableClasses from '@quanta/styles/tables.scss';
import operationsClasses from '@quanta/styles/operations.scss';
import classes from '@quanta/styles/template.scss';
import { Apis } from "@quantadex/bitsharesjs-ws";
import lodash from 'lodash';

var wsString = "wss://testnet-01.quantachain.io:8095";

class Ledger extends Component {
	constructor(props) {
		super(props);

		this.state = {
			operations: []
		};
	}

	componentDidMount() {
		const self = this;
		const { id } = this.props.match.params;
		self.setState({ sequence: id })

		Apis.instance(wsString, true, 3000, { enableOrders: false }).init_promise.then((res) => {
			Apis.instance().db_api().exec("list_assets", ["A", 100]).then((assets) => {
				// console.log("assets ", assets);
				window.assets = lodash.keyBy(assets, "id")
				window.assetsBySymbol = lodash.keyBy(assets, "symbol")
				return assets;
			}).then(e => {
				Apis.instance().db_api().exec("get_block", [id]).then(async e => {
					// console.log(e)
					const transactionsList = []
					for (let item of e.transactions) {
						for (let i = 0; i < item.operations.length; i++) {
							let opData = await operationData(item.operations[i], Apis)
							let blockData = { block: id, timestamp: e.timestamp, id: id + '.' + i }
							transactionsList.push({ ...opData, ...blockData })
						}
					}
					// console.log(transactionsList)
					self.setState({
						hash: e.transaction_merkle_root,
						timestamp: e.timestamp,
						transactions: e.transactions,
						operations: transactionsList
					})
				})
			})

		})
	}

	renderDetails = () => {
		return (
			<div className={classes.details}>
				<h2>Ledger</h2>
				<Row>
					<Col xs={6} sm={6} md={2} className={classes.section}>
						<LabelText label="SEQUENCE" text={this.state.sequence} />
					</Col>
					<Col md={7} className={classNames(classes.section, 'hidden-sm')}>
						<LabelText label="HASH" text={this.state.hash} isLong />
					</Col>
					<Col xs={6} sm={6} md={3} className={classes.section}>
						<LabelText label="CLOSED AT" text={dateToString(this.state.timestamp)} />
					</Col>
					<Col xs={12} sm={12} className={classNames(classes.section, 'show-sm')}>
						<LabelText label="HASH" text={this.state.hash} isLong />
					</Col>
				</Row>
				<Row>
					<Col xs={6} sm={6} md={2} className={classes.section}>
						<LabelText label="TRANSACTIONS" text={this.state.transactions && this.state.transactions.length} />
					</Col>
					<Col xs={6} sm={6} md={2} className={classes.section}>
						<LabelText label="OPERATIONS" text={this.state.operations && this.state.operations.length} />
					</Col>
				</Row>
			</div>
		);
	};

	renderOperationsRecord = operations => {
		return (
			<React.Fragment>
				{operations.map((operation, index) => (
					< React.Fragment key={index} >
						<div className={classNames(tableClasses.body, 'hidden-sm')}>
							<a href={"/ledgers/" + operation.id.split(".")[0]} className={operationsClasses.id}>
								{operation.id}
							</a>
							<div className={operationsClasses.description}>
								<OperationDescription operation={operation} />
							</div>
							<div className={operationsClasses.created}>{timeAgo(operation.timestamp)} ago</div>
						</div>
						<div className={classNames(tableClasses.body, 'show-sm', 'flex-column')}>
							<div className="d-flex justify-content-between w-100">
								<a href={"/ledgers/" + operation.id.split(".")[0]} className={operationsClasses.id}>
									{operation.id}
								</a>
								<div className={operationsClasses.created}>{timeAgo(operation.timestamp)} ago</div>
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

	renderOprationsHistory = () => {
		const { operations } = this.state;
		// const { id } = this.props.match.params;
		return (
			<div className={classNames(operationsClasses.history)}>
				<div className={operationsClasses.header}>
					<h2>Operations History</h2>
				</div>
				<div className={tableClasses.table}>
					<div className={classNames(tableClasses.header, 'hidden-sm')}>
						<div className={operationsClasses.id}>Id</div>
						<div className={operationsClasses.description} />
						<div className={operationsClasses.created}>Created</div>
					</div>
					{this.renderOperationsRecord(operations)}
				</div>
			</div>
		);
	};

	render() {
		const { isFetching, ledger } = this.props;
		return isFetching || !ledger ? (
			<React.Fragment />
		) : (
				<React.Fragment>
					{this.renderDetails()}
					<div className={classes.main}>{this.renderOprationsHistory()}</div>
				</React.Fragment>
			);
	}
}

const { func, shape, bool, arrayOf, object } = PropTypes;
Ledger.propTypes = {
	fetchLedger: func.isRequired,
	fetchLedgerOperations: func.isRequired,
	ledger: shape({}).isRequired,
	isFetching: bool.isRequired,
	operations: arrayOf(object),
};

Ledger.defaultProps = {
	operations: [],
};
export default Ledger;
