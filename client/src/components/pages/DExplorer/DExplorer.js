import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './DExplorer.scss';

import lodash from 'lodash';
import { Apis } from "@quantadex/bitsharesjs-ws";
import { ChainStore } from "@quantadex/bitsharesjs";
import OperationDescription from '@quanta/components/common/OperationDescription';

var wsString = "wss://testnet-01.quantachain.io:8095";

class DExplorer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			operationsList: [],
			blocksList: [],
			nodes: 0
		};
	}

	updateChainState() {
		const object = ChainStore.getObject("2.1.0");

		if (object == null) {
			return;
		}

		if (this.state.nodes !== object.size) {
			this.setState({ nodes: object.size })
		}
	}

	componentDidMount() {
		const self = this;
		const names = {};
		var last_block = null;
		const blockTimes = [];

		Apis.instance(wsString, true, 3000, { enableOrders: false }).init_promise.then((res) => {
			// console.log("connected to:", res[0].network);

			ChainStore.init(false).then(() => {
				ChainStore.subscribe(this.updateChainState.bind(this));
			});
		}).then((e) => {
			Apis.instance().db_api().exec("list_assets", ["A", 100]).then((assets) => {
				// console.log("assets ", assets);
				window.assets = lodash.keyBy(assets, "id")
				window.assetsBySymbol = lodash.keyBy(assets, "symbol")
				return assets;
			})
		}).then((e) => {
			action()
		})

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

		function getWitnessName(id) {
			if (names[id] !== undefined) {
				return names[id]
			} else {
				return Apis.instance().db_api().exec("get_witnesses", [[id]]).then(async e => {
					let name = await getName(e[0].witness_account)
					names[id] = name
					return name
				})
			}
		}

		function timeDiff(t1, t2) {
			const time1 = new Date(t1);
			const time2 = new Date(t2);
			return (time1 - time2)
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

		function action() {
			const transactionsList = []
			Apis.instance().db_api().exec("get_dynamic_global_properties", []).then((res) => {
				// console.log("properties ", res);
				return res
			}).then((e) => {
				if (e.head_block_number !== last_block) {
					last_block = e.head_block_number;
					Apis.instance().db_api().exec("get_block", [e.head_block_number]).then(async (res) => {
						// console.log("block ", e.head_block_number, res);
						let name = undefined;
						if (names[res.witness] === undefined) {
							name = await getWitnessName(res.witness)
						} else {
							name = names[res.witness]
						}

						let newBlock = {
							block: e.head_block_number, witness: name,
							transactions: res.transactions.length,
							timestamp: res.timestamp
						}

						let oldList = self.state.blocksList;

						if (oldList.length > 0) {
							if (blockTimes.length >= 100) {
								blockTimes.shift()
							}
							blockTimes.push(timeDiff(res.timestamp, oldList[0].timestamp))
							self.setState({ averageBlockLatency: Math.round(blockTimes.reduce((a, b) => a + b, 0) / blockTimes.length) })
						}

						while (oldList.length >= 10) {
							oldList.pop()
						}
						oldList.unshift(newBlock)

						self.setState({ blocksList: oldList })

						return [res, e.head_block_number]
					})
						.then(async (e) => {
							var i = 0;
							for (var item of e[0].transactions) {
								if (i > 10) {
									break
								}
								try {
									let opData = await operationData(item.operations[0])
									let blockData = { block: e[1], timestamp: e[0].timestamp, id: e[1] + '.' + i }
									transactionsList.push({ ...opData, ...blockData })
								} catch (e) {
									console.log('item', e, item)
								}
								i++;
							};

							if (transactionsList.length > 0) {
								let oldList = self.state.operationsList
								let newList = transactionsList.concat(oldList)
								while (newList.length > 10) {
									newList.pop()
								}
								self.setState({ operationsList: newList })
								// console.log('state', self.state)
							}

							action()
						})
				} else {
					setTimeout(() => action(), 500);
				}
			})
		}

	}

	timeAgo(t, adjust = 0) {
		const expr = new Date(t + "z");
		const old_date = new Date(expr.setFullYear(expr.getFullYear() - adjust));
		const now = new Date();
		return ((now.getTime() - old_date.getTime()) / 1000).toFixed(0)
	}

	typeToAction(type, data) {

		switch (type) {
			case 1:
				return (
					<tr key={data.id}>
						<td><a href={"/ledgers/" + data.block}>{data.block}</a></td>
						<td>
							<OperationDescription operation={data} />
						</td>

						<td className="text-right">{this.timeAgo(data.timestamp)} seconds ago</td>
					</tr>
				)
			case 2:
				return (
					<tr key={data.id}>
						<td><a href={"/ledgers/" + data.block}>{data.block}</a></td>
						<td>
							<OperationDescription operation={data} />
						</td>

						<td className="text-right">{this.timeAgo(data.timestamp)} seconds ago</td>
					</tr>
				)
			default:
				console.log(type, data)
				return "not map"
		}
	}

	render() {
		return (
			<div>
				<div className={classes.status}>
					<div>Highest Block <br /> <span>{this.state.blocksList[0] ? this.state.blocksList[0].block : ""}</span></div>
					<div>Average Block Latency <br /> <span>{this.state.averageBlockLatency} ms</span></div>
					<div>Number of Nodes <br /> <span>{this.state.nodes}</span></div>
				</div>

				<div className={classes.content}>
					<h3>Transaction History</h3>
					<div className={classes.opList}>
						<table>
							<thead>
								<tr>
									<th>BLOCK #</th>
									<th></th>
									<th className="text-right">CREATED</th>
								</tr>
							</thead>
							<tbody>
								{this.state.operationsList.map(data => {
									return (
										<tr key={data.id}>
											<td><a href={"/ledgers/" + data.block}>{data.block}</a></td>
											<td>
												<OperationDescription operation={data} />
											</td>

											<td className="text-right">{this.timeAgo(data.timestamp)} seconds ago</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>

					<h3>Block History</h3>
					<div className={classes.blocksList}>
						<table>
							<thead>
								<tr>
									<th>BLOCK #</th>
									<th className="text-center">TRANSACTIONS</th>
									<th className="text-center">WITNESS</th>
									<th className="text-right">CREATED</th>
								</tr>
							</thead>
							<tbody>
								{this.state.blocksList.map(row => {
									return (
										<tr key={row.block}>
											<td><a href={"/ledgers/" + row.block}>{row.block}</a></td>
											<td className="text-center">{row.transactions}</td>
											<td className="text-center">{row.witness}</td>
											<td className="text-right">{this.timeAgo(row.timestamp)} seconds ago</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
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
