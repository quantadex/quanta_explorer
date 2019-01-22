import React, { Component } from 'react';
import classes from './Committee.scss';
import { Apis } from "@quantadex/bitsharesjs-ws";

var wsString = "wss://testnet-01.quantachain.io:8095";

class Committee extends Component {
	constructor(props) {
		super(props);

		this.state = {
			members: [],
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
				return e.active_committee_members
			}).then(e => {
				Apis.instance().db_api().exec("get_committee_members", [e]).then(async members => {
					// console.log(members)
					const list = []
					for (let member of members) {
						let name = await getName(member.committee_member_account)
						list.push({ name: name, ...member })
					}
					this.setState({ members: list })
				})
			})
		})
	}

	render() {
		return (
			<div className={classes.container}>
				<h3>Active Committee Members</h3>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Account</th>
							<th className="text-right">Total votes</th>
						</tr>
					</thead>
					<tbody>
						{this.state.members.map(member => {
							return (
								<tr key={member.id}>
									<td><a href={"/account/" + member.name}>{member.id}</a></td>
									<td><a href={"/account/" + member.name}>{member.name}</a></td>
									<td className="text-right">{member.total_votes.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Committee;
