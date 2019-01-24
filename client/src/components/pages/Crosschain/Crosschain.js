import React, { Component } from 'react';
import classes from './Crosschain.scss';
import QuantaSelect from '@quanta/components/common/QuantaSelect';
import Pagination from '@quanta/components/common/Pagination';
import { Apis } from "@quantadex/bitsharesjs-ws";
import lodash from 'lodash';

var wsString = "wss://testnet-01.quantachain.io:8095";
const url = "https://wya99cec1d.execute-api.us-east-1.amazonaws.com/testnet/"

class Crosschain extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			currentPage: Number(this.props.match.params.page),
			status: undefined,
			rowPerPage: 15,
		};
	}

	getNode(id) {
		this.setState({ selected: id })
		fetch(url + id + "/status").then(e => e.json()).then(e => {
			this.setState({ status: e })
			fetch(url + id + "/history").then(e => e.json()).then(e => {
				this.setState({ list: e })
			})
		})
	}

	changeNode(e) {
		this.props.history.push(`/crosschain/${e.value}/1`)
	}

	goToPage(e) {
		// this.setState({ currentPage: e })
		this.props.history.push(`/crosschain/${this.props.match.params.id}/${e}`)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.id !== this.state.selected) {
			this.getNode(nextProps.match.params.id)
		}
		if (nextProps.match.params.page !== this.state.currentPage) {
			this.setState({ currentPage: Number(nextProps.match.params.page) })
		}
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		Apis.instance(wsString, true, 3000, { enableOrders: false }).init_promise.then((res) => {
			Apis.instance().db_api().exec("list_assets", ["A", 100]).then((assets) => {
				// console.log("assets ", assets);
				window.assets = lodash.keyBy(assets, "id")
				window.assetsBySymbol = lodash.keyBy(assets, "symbol")
				return assets;
			}).then(e => {
				this.getNode(id)
			})
		})
	}

	timeAgo(t, adjust = 0) {
		const expr = new Date(t);
		const old_date = new Date(expr.setFullYear(expr.getFullYear() - adjust));
		const now = new Date();
		const timeDiff = ((now.getTime() - old_date.getTime()) / 1000).toFixed(0)
		return timeDiff < 60 * 60 ? timeDiff + " seconds" :
			timeDiff < 60 * 60 * 24 ? Math.round(timeDiff / 60 / 60) + " hours" :
				Math.round(timeDiff / 60 / 60 / 24) + " days"
	}

	shorten(str) {
		if (str.length > 10) {
			return str.slice(0, 7) + "..."
		}
		return str
	}

	handleCoin(coin) {
		let c = coin.split("0X")

		if (c.length === 2) {
			return (
				<a href={"https://ropsten.etherscan.io/token/0x" + c[1]} title={coin} target="_blank"> {c[0]}</a >
			)
		}
		return coin
	}

	render() {
		const nodes = { node1: "Node 1", node2: "Node 2", node3: "Node 3" }

		return (
			<div className={classes.container}>
				<h3>Crosschain</h3>
				<div className="d-flex justify-content-between">
					<div className="small">
						<b>CurrentBlockETH:</b> {this.state.status && this.state.status["CURRENTBLOCK:ETH"]}<br />
						<b>CurrentBlockQuanta:</b> {this.state.status && this.state.status["CURRENTBLOCK:QUANTA"]}<br />
						<b>Public Key:</b> {this.state.status && this.state.status.PUBLIC_KEY}
					</div>
					<QuantaSelect
						isSearchable={false}
						options={Object.entries(nodes).map(node => {
							return { value: node[0], label: node[1] }
						})
						}

						value={{ value: this.props.match.params.id, label: nodes[this.props.match.params.id] }}
						className={classes.category}
						onChange={this.changeNode.bind(this)}
					/>
				</div>

				<table>
					<thead>
						<tr>
							<th>TYPE</th>
							<th>SOURCE TX</th>
							<th>FROM</th>
							<th>TO TX</th>
							<th>TO</th>
							<th className="text-right">COIN</th>
							<th className="text-right">AMOUNT</th>
							<th className="text-right">BOUNCED</th>
							<th className="text-right">SUBMIT STATE</th>
							<th className="text-right">SUBMIT DATE</th>
						</tr>
					</thead>
					<tbody>
						{this.state.list.slice((this.state.currentPage - 1) * this.state.rowPerPage, this.state.currentPage * this.state.rowPerPage).map(row => {
							return (
								<tr key={row.Type + row.Tx}>
									<td className="text-uppercase">{row.Type}</td>
									<td><a href={(row.Type == "deposit" ? "https://ropsten.etherscan.io/tx/" + row.Tx : "http://testnet.quantadex.com/ledgers/" + row.Tx.split("_")[0])} title={row.Tx} target="_blank">{this.shorten(row.Tx)}</a></td>
									<td><a href={(row.Type == "deposit" ? "https://ropsten.etherscan.io/address/" : "http://testnet.quantadex.com/account/") + row.From} title={row.From} target="_blank">{this.shorten(row.From)}</a></td>
									<td></td>
									<td><a href={(row.Type == "deposit" ? "http://testnet.quantadex.com/account/" : "https://ropsten.etherscan.io/address/") + row.To} title={row.To} target="_blank">{this.shorten(row.To)}</a></td>
									<td className="text-right">{this.handleCoin(row.Coin)}</td>
									<td className="text-right">{row.Amount / Math.pow(10, row.Type == "withdrawal" ? 5 : (window.assetsBySymbol[row.Coin] ? window.assetsBySymbol[row.Coin].precision : 0))}</td>
									<td className="text-right text-capitalize">{String(row.IsBounced)}</td>
									<td className="text-right text-capitalize">{row.SubmitState}</td>
									<td className="text-right">{this.timeAgo(row.SubmitDate)} ago</td>
								</tr>
							)
						})}
					</tbody>
				</table>

				<Pagination length={Math.ceil(this.state.list.length / this.state.rowPerPage)} current={this.state.currentPage} onClick={this.goToPage.bind(this)} />
			</div>
		)
	}
}

export default Crosschain;
