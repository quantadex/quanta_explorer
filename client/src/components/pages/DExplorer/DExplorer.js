import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './DExplorer.scss';

import lodash from 'lodash';
import { Apis } from "@quantadex/bitsharesjs-ws";
import { ChainStore } from "@quantadex/bitsharesjs";

var initAPI = false;
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

		if (this.state.nodes != object.size) {
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
			initAPI = true;

			ChainStore.init(false).then(() => {
				ChainStore.subscribe(this.updateChainState.bind(this));
			});
		})
			.then((e) => {
				Apis.instance().
					db_api().exec("list_assets", ["A", 100]).then((assets) => {
						// console.log("assets ", assets);
						window.assets = lodash.keyBy(assets, "id")
						window.assetsBySymbol = lodash.keyBy(assets, "symbol")
						return assets;
					})
			})
			.then((e) => {
				action()
			})

		function getName(id) {
			return Apis.instance().db_api().exec("get_accounts", [[id]]).then(e => {
				names[id] = e[0].name
				return e[0].name
			})
		}

		function getWitnessName(id) {
			return Apis.instance().db_api().exec("get_witnesses", [[id]]).then(async e => {
				let name = await getName(e[0].witness_account)
				names[id] = name
				return name
			})
		}

		function timeDiff(t1, t2) {
			const time1 = new Date(t1);
			const time2 = new Date(t2);
			return (time1 - time2)
		}

		function action() {
			const transactionsList = []
			Apis.instance().
				db_api().exec("get_dynamic_global_properties", []).then((res) => {
					// console.log("properties ", res);
					return res
				})
				.then((e) => {
					if (e.head_block_number !== last_block) {
						last_block = e.head_block_number;
						Apis.instance().
							db_api().exec("get_block", [e.head_block_number]).then(async (res) => {
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
								for (var item of e[0].transactions) {
									// console.log(e)
									try {
										const op_id = item.operation_results
										const op = item.operations
										for (let i = 0; i < op_id.length; i++) {
											let name = undefined
											if (names[op[i][1].seller] === undefined) {
												name = await getName(op[i][1].seller)
											} else {
												name = names[op[i][1].seller]
											}
											let data = { block: e[1], id: op_id[i][1], username: name, type: op[i][0], data: op[i][1] }
											transactionsList.push(data)
										}
									} catch {
										console.log('item', item)
									}
								};

								if (transactionsList.length > 0) {
									let oldList = self.state.operationsList
									while (oldList.length >= 10) {
										oldList.pop()
									}
									let newList = transactionsList.concat(oldList)
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
							<a href={"/account/" + data.username}>{data.username}</a> wants&nbsp;
					{data.data.min_to_receive.amount / Math.pow(10, window.assets[data.data.min_to_receive.asset_id].precision)}
							&nbsp;{window.assets[data.data.min_to_receive.asset_id].symbol} for&nbsp;
					{data.data.amount_to_sell.amount / Math.pow(10, window.assets[data.data.amount_to_sell.asset_id].precision)}
							&nbsp;{window.assets[data.data.amount_to_sell.asset_id].symbol}
						</td>

						<td className="text-right">{this.timeAgo(data.data.expiration, 5)} seconds ago</td>
					</tr>
				)
			default:
				return "not map"
		}
	}

	render() {
		return (
			<div>
				<div className={classes.status}>
					<div>Highest Block <span>{this.state.blocksList[0] ? this.state.blocksList[0].block : ""}</span></div>
					<div>Average Block Latency <span>{this.state.averageBlockLatency} ms</span></div>
					<div>Number of Nodes <span>{this.state.nodes}</span></div>
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
								{this.state.operationsList.map(row => {
									return this.typeToAction(row.type, row)
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
