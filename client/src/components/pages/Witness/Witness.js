import React, { Component } from 'react';
import classes from './Witness.scss';
import { Apis } from "@quantadex/bitsharesjs-ws";

var wsString = "wss://testnet-01.quantachain.io:8095";

class Witness extends Component {
	constructor(props) {
		super(props);

		this.state = {
			witnesses: [],
		};
	}

	componentDidMount() {
		function getName(id) {
			return Apis.instance().db_api().exec("get_accounts", [[id]]).then(e => {
				return e[0].name
			})
		}

		Apis.instance(wsString, true, 3000, { enableOrders: false }).init_promise.then((res) => {
			// console.log("connected to:", res[0].network);
			Apis.instance().db_api().exec("get_global_properties", []).then(e => {
				// console.log(e)
				return e.active_witnesses
			}).then(e => {
				Apis.instance().db_api().exec("get_witnesses", [e]).then(async witnesses => {
					// console.log(witnesses)
					const list = []
					for (let witness of witnesses) {
						let name = await getName(witness.witness_account)
						list.push({ name: name, ...witness })
					}
					this.setState({ witnesses: list })
				})
			})
		})
	}

	render() {
		return (
			<div className={classes.container}>
				<h3>Active Witnesses</h3>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Account</th>
							<th className="text-right">Total votes</th>
							<th className="text-right">Missed</th>
							<th className="text-right">Last Confirmed Block</th>
						</tr>
					</thead>
					<tbody>
						{this.state.witnesses.map(witness => {
							return (
								<tr key={witness.id}>
									<td><a href={"/account/" + witness.name}>{witness.id}</a></td>
									<td><a href={"/account/" + witness.name}>{witness.name}</a></td>
									<td className="text-right">{Number(witness.total_votes).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
									<td className="text-right">{witness.total_missed.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
									<td className="text-right">{witness.last_confirmed_block_num.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Witness;
