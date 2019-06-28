import React, { Component } from 'react';
import classes from './Assets.scss';
import { Apis } from "@quantadex/bitsharesjs-ws";
import GrapheneApi from "@quantadex/bitsharesjs-ws/cjs/src/GrapheneApi";
import ChainWebSocket from "@quantadex/bitsharesjs-ws/cjs/src/ChainWebSocket";
import config from '@quanta/config';
import lodash from 'lodash';

class Assets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: []
        };
    }

    componentDidMount() {
        Apis.instance(config.getEnv().WEBSOCKET_PATH, true, 3000, { enableOrders: false }).init_promise
            .then(async () => {
                const assets = await Apis.instance().db_api().exec("list_assets", ["A", 100])

                let conn = new ChainWebSocket(config.getEnv().WEBSOCKET_PATH, () => { }, 3000, true, () => { });
                await conn.login("", "")

                var asset_api = new GrapheneApi(conn, "asset");
                await asset_api.init()


                const all = await asset_api.exec("get_all_asset_holders", [])
                const all_holder = lodash.keyBy(all, "asset_id")

                for (let asset of assets) {
                    const supply = await Apis.instance().db_api().exec("get_objects", [[asset.dynamic_asset_data_id]])
                    const list = this.state.assets
                    list.push({ asset, supply: supply[0].current_supply, count: all_holder[asset.id].count || 0 })
                    this.setState({ assets: list })
                }
            })
    }

    render() {
        const { match } = this.props
        return (
            <div className={classes.container}>
                <h3>Assets</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th className="text-right">Total Supply</th>
                            <th className="text-right">Holders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.assets.map(asset => {
                            return (
                                <tr key={asset.asset.id}>
                                    <td><a href={"/" + match.params.network + "/asset/" + asset.asset.id + "/1"}>{asset.asset.symbol.split('0X')[0]}</a></td>
                                    <td className="text-right">{(asset.supply / Math.pow(10, asset.asset.precision)).toLocaleString(navigator.language, { minimumFractionDigits: asset.asset.precision })}</td>
                                    <td className="text-right">{asset.count.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Assets;
