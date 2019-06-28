import React, { Component } from 'react';
import classes from './Asset.scss';
import { Apis } from "@quantadex/bitsharesjs-ws";
import GrapheneApi from "@quantadex/bitsharesjs-ws/cjs/src/GrapheneApi";
import ChainWebSocket from "@quantadex/bitsharesjs-ws/cjs/src/ChainWebSocket";
import Pagination from '@quanta/components/common/Pagination';
import config from '@quanta/config';

class Asset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            holders: [],
            currentPage: Number(this.props.match.params.page),
            rowPerPage: 15,
        };
    }

    async getHolders(id, page) {
        const { rowPerPage } = this.state
        if (!this.asset_api || this.asset_api.ws_rpc.closed) {
            await this.connectWS()
        }
        const count = await this.asset_api.exec("get_asset_holders_count", [id])
        return this.asset_api.exec("get_asset_holders", [id, Number(page - 1) * rowPerPage, rowPerPage])
            .then(res => {
                this.setState({ holders: res, last_page: res.length < rowPerPage, count })
            })
    }

    goToPage(e) {
        this.props.history.push(`/${this.props.match.params.network}/asset/${this.props.match.params.id}/${e}`)
    }

    async connectWS() {
        let conn = new ChainWebSocket(config.getEnv().WEBSOCKET_PATH, () => { }, 3000, true, () => { });
        await conn.login("", "")

        this.asset_api = new GrapheneApi(conn, "asset");
        await this.asset_api.init()
    }

    componentDidMount() {
        const { match } = this.props
        const { currentPage } = this.state
        Apis.instance(config.getEnv().WEBSOCKET_PATH, true, 3000, { enableOrders: false }).init_promise
            .then(async () => {
                const assets = await Apis.instance().db_api().exec("get_assets", [[match.params.id]])

                const asset = assets[0]
                this.getHolders(asset.id, currentPage)
                this.setState({ asset })
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.page !== this.state.currentPage) {
            this.getHolders(nextProps.match.params.id, nextProps.match.params.page)
            this.setState({ currentPage: Number(nextProps.match.params.page) })
        }
    }

    render() {
        const { match } = this.props
        const { asset, holders, currentPage, last_page, count } = this.state
        const symbol = asset && asset.symbol.split('0X')
        return (
            asset ?
                <div className={classes.container}>
                    <h3>{symbol[0]} | {asset.id}</h3>
                    {symbol[1] ? <h6>0x{symbol[1]}</h6> : null}
                    <div className="small text-secondary">{asset.options.description}</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Holders ({count})</th>
                                <th className="text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {holders.map(holder => {
                                return (
                                    <tr key={holder.account_id}>
                                        <td><a href={"/" + match.params.network + "/account/" + holder.account_id}>{holder.name.split('0X')[0]}</a></td>
                                        <td className="text-right">{(holder.amount / Math.pow(10, asset.precision)).toLocaleString(navigator.language, { minimumFractionDigits: asset.precision })}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Pagination current={currentPage}
                        isLast={last_page}
                        onClick={this.goToPage.bind(this)} />
                </div>
                : null
        )
    }
}

export default Asset;
