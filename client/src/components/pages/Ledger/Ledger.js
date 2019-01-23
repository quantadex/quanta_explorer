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
			if (names[id] !== undefined) {
				return names[id]
			} else {
				return Apis.instance().db_api().exec("get_accounts", [[id]]).then(e => {
					names[id] = e[0].name
					return e[0].name
				})
			}
		}

		async function operationData(op) {
			let type = op[0]
			let operation = op[1]
			let name1, name2, uid, uid2
			uid2 = false

			switch (type) {
				case 0:
					uid = operation.from
					uid2 = operation.to
					break
				case 1:
					uid = operation.seller
					break
				case 2:
					uid = operation.fee_paying_account
					break
				case 3:
					uid = operation.funding_account
					break
				case 4:
					uid = operation.account_id
					break
				case 5:
					uid = operation.registrar
					uid2 = operation.referrer
					break
				case 6:
					uid = operation.account
					break
				case 14:
					uid = operation.issuer
					uid2 = operation.issue_to_account
					break
				case 15:
					uid = operation.payer
					break
				case 19:
					uid = operation.publisher
					break
				case 22:
					uid = operation.fee_paying_account
					break
				case 23:
					uid = operation.fee_paying_account
					break
				case 33:
					uid = operation.owner
					break
				case 37:
					uid = operation.deposit_to_account
					break

				default:
					throw op
			}

			if (uid) {
				name1 = await getName(uid)
			}
			if (uid2) {
				name2 = await getName(uid2)
			}

			return { name1: name1, name2: name2, type: type, data: operation }
		}

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
							let opData = await operationData(item.operations[i])
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
				Math.round(timeDiff / 60 / 60 / 24) + " days"
	}

	renderOperationsRecord = operations => {
		return (
			<React.Fragment>
				{operations.map((operation, index) => (
					< React.Fragment key={index} >
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
							<div className={operationsClasses.created}>{this.timeAgo(operation.timestamp)} ago</div>
						</div>
						<div className={classNames(tableClasses.body, 'show-sm', 'flex-column')}>
							<div className="d-flex justify-content-between w-100">
								<a
									href=""
									className={operationsClasses.id}
								>
									{operation.id}
								</a>
								<div className={operationsClasses.created}>{this.timeAgo(operation.timestamp)} ago</div>
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
