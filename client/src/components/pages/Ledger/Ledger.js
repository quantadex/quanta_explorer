import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap';
import ReactEventSource from 'react-eventsource';
import urlParse from 'url-parse';

import CONFIG from '@quanta/config';
import OperationDescription from '@quanta/components/common/OperationDescription';
import LabelText from '@quanta/components/common/LabelText';
import { dateToString, timeDiff } from '@quanta/helpers/utils';
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
		const names = {};
		self.setState({ sequence: id })

		function getName(id) {
			return Apis.instance().db_api().exec("get_accounts", [[id]]).then(e => {
				names[id] = e[0].name
				return e[0].name
			})
		}

		Apis.instance(wsString, true, 3000, { enableOrders: false }).init_promise.then((res) => {
			Apis.instance().db_api().exec("list_assets", ["A", 100]).then((assets) => {
				// console.log("assets ", assets);
				window.assets = lodash.keyBy(assets, "id")
				window.assetsBySymbol = lodash.keyBy(assets, "symbol")
				return assets;
			}).then(e => {
				Apis.instance().db_api().exec("get_block", [id]).then(async e => {
					console.log(e)
					const opList = []
					for (let tx of e.transactions) {
						for (let i = 0; i < tx.operation_results.length; i++) {
							let name = {};
							if (tx.operation_results[i][0] == 1) {
								let seller = tx.operations[i][1].seller
								if (names[seller] === undefined) {
									name[seller] = await getName(seller)
								} else {
									name[seller] = names[seller]
								}
							}

							opList.push({
								id: tx.operation_results[i][1], type: tx.operation_results[i][0],
								data: tx.operations[i][1], names: name
							})
						}
					}
					console.log(opList)
					self.setState({
						hash: e.transaction_merkle_root,
						timestamp: e.timestamp,
						transactions: e.transactions,
						operations: opList
					})
				})
			})

		})
	}

	renderDetails = () => {
		const { ledger } = this.props;
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

	timeAgo(t, adjust = 0) {
		const expr = new Date(t + "z");
		const old_date = new Date(expr.setFullYear(expr.getFullYear() - adjust));
		const now = new Date();
		const timeDiff = ((now.getTime() - old_date.getTime()) / 1000).toFixed(0)
		return timeDiff < 60 * 60 ? timeDiff + " seconds" :
			timeDiff < 60 * 60 * 24 ? Math.round(timeDiff / 60 / 60) + " hours" :
				Math.round(timeDiff / 60 / 60 / 24) + "days"
	}

	renderOperationsRecord = operations => {
		return (
			<React.Fragment>
				{operations.map(operation => (
					< React.Fragment key={operation.id} >
						<div className={classNames(tableClasses.body, 'hidden-sm')}>
							<a
								href=""
								className={operationsClasses.id}
							>
								{operation.id}
							</a>
							<div className={operationsClasses.description}>
								<OperationDescription operation={operation} />
							</div>
							<div className={operationsClasses.created}>{this.timeAgo(operation.data.expiration, 5)} ago</div>
						</div>
						<div className={classNames(tableClasses.body, 'show-sm', 'flex-column')}>
							<div className="d-flex justify-content-between w-100">
								<a
									href=""
									className={operationsClasses.id}
								>
									{operation.id}
								</a>
								<div className={operationsClasses.created}>{this.timeAgo(operation.data.expiration, 5)} ago</div>
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
		const { id } = this.props.match.params;
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
