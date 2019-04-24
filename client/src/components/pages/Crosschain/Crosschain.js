import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Crosschain.scss';
import QuantaSelect from '@quanta/components/common/QuantaSelect';
import Pagination from '@quanta/components/common/Pagination';
import { Apis } from "@quantadex/bitsharesjs-ws";
import lodash from 'lodash';
import config from '@quanta/config';

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
		fetch(config.getEnv().API_PATH + id + "/status").then(e => e.json()).then(e => {
			this.setState({ status: e })
		})
	}

	getHistory(id, page) {
		const { rowPerPage } = this.state
		fetch(config.getEnv().API_PATH + id + `/history?offset=${(Number(page) - 1) * rowPerPage}&limit=${rowPerPage}`)
			.then(e => e.json()).then(e => {
				this.setState({ list: e, last_page: e.length < rowPerPage })
			})
	}

	changeNode(e) {
		this.props.history.push(`/${this.props.match.params.network}/crosschain/${e.value}/1`)
	}

	goToPage(e) {
		// this.setState({ currentPage: e })
		this.props.history.push(`/${this.props.match.params.network}/crosschain/${this.props.match.params.id}/${e}`)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.id !== this.state.selected) {
			this.getNode(nextProps.match.params.id)
		}
		if (nextProps.match.params.page !== this.state.currentPage) {
			this.getHistory(nextProps.match.params.id, nextProps.match.params.page)
			this.setState({ currentPage: Number(nextProps.match.params.page) })
		}
	}

	componentDidMount() {
		const { id, page } = this.props.match.params;
		Apis.instance(config.getEnv().WEBSOCKET_PATH, true, 3000, { enableOrders: false }).init_promise.then((res) => {
			Apis.instance().db_api().exec("list_assets", ["A", 100]).then((assets) => {
				// console.log("assets ", assets);
				window.assets = lodash.keyBy(assets, "id")
				window.assetsBySymbol = lodash.keyBy(assets, "symbol")
				return assets;
			}).then(e => {
				this.getNode(id)
				this.getHistory(id, page)
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
				<div className={classes.sToken}>
					<a href={config.getEnv().ETHERSCAN_URL + "/token/0x" + c[1]} target="_blank" rel="noopener noreferrer"> {c[0]}</a>
					<div className={classes.coinToken}>0X{c[1]}</div>
				</div >
			)
		}
		return coin
	}

	coinURL(coinName, type) {
		const testnet = this.props.match.params.network == 'testnet'
		const coin = coinName.toLowerCase()
		switch (coin) {
			case "btc":
				return testnet ? config.getEnv().BLOCKCYPHER_URL + coin + "-testnet" + type : config.getEnv().BLOCKCYPHER_URL + coin + type
			case "ltc":
				return testnet ? "https://chain.so" + type + "LTCTEST/" : config.getEnv().BLOCKCYPHER_URL + coin + type
			case "bch":
				return config.getEnv().BITCOIN_URL + coin + type
			default:
				return config.getEnv().ETHERSCAN_URL + type
		}
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
						{this.state.list.map((row, index) => {
							return (
								<tr key={index}>
									<td className="text-uppercase">{row.Type}</td>
									<td><a href={(row.Type === "deposit" && !row.IsBounced ? this.coinURL(row.Coin, "/tx/") : config.getEnv().EXPLORER_URL + "/ledgers/") + row.Tx.split("_")[0]} title={row.Tx} target="_blank" rel="noopener noreferrer">{this.shorten(row.Tx)}</a></td>
									<td><a href={(row.Type === "deposit" && !row.IsBounced ? this.coinURL(row.Coin, "/address/") : config.getEnv().EXPLORER_URL + "/account/") + row.From.split(',')[0]} title={row.From.split(',')[0]} target="_blank" rel="noopener noreferrer">{this.shorten(row.From.split(',')[0])}</a></td>
									<td><a href={(row.Type === "deposit" || row.IsBounced ? config.getEnv().EXPLORER_URL + "/ledgers/" : this.coinURL(row.Coin, "/tx/")) + row.SubmitTxHash.split("_")[0]} title={row.SubmitTxHash} target="_blank" rel="noopener noreferrer">{this.shorten(row.SubmitTxHash)}</a></td>
									<td><a href={(row.Type === "deposit" || row.IsBounced ? config.getEnv().EXPLORER_URL + "/account/" : this.coinURL(row.Coin, "/address/")) + row.To.split(',')[0]} title={row.To.split(',')[0]} target="_blank" rel="noopener noreferrer">{this.shorten(row.To.split(',')[0])}</a></td>
									<td className="text-right">{this.handleCoin(row.Coin)}</td>
									<td className="text-right">{row.Amount / Math.pow(10, row.Type === "withdrawal" ? 5 : (window.assetsBySymbol[row.Coin] ? window.assetsBySymbol[row.Coin].precision : 0))}</td>
									<td className="text-right text-capitalize">{String(row.IsBounced)}</td>
									<td className="text-right text-capitalize">{row.SubmitState}</td>
									<td className="text-right">{this.timeAgo(row.SubmitDate)} ago</td>
								</tr>
							)
						})}
					</tbody>
				</table>

				<Pagination current={this.state.currentPage} isLast={this.state.last_page} onClick={this.goToPage.bind(this)} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	environmentType: state.header.environmentType,
});

export default connect(mapStateToProps)(Crosschain);
