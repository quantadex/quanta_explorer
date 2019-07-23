import React, { Component } from 'react';
import classes from './Dice.scss';
import { Apis } from "@quantadex/bitsharesjs-ws";
import { localeString } from '@quanta/helpers/utils';
import config from '@quanta/config';
import lodash from 'lodash';

class Dice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {},
            assets: []
        };
    }

    componentDidMount() {
        Apis.instance(config.getEnv().WEBSOCKET_PATH, true, 3000, { enableOrders: false }).init_promise
            .then(async () => {
                const list = {}
                const assets = lodash.keyBy(await Apis.instance().db_api().exec("list_assets", ["A", 100]), "id")

                const risk = (await fetch(config.getEnv().API_PATH + "account?filter_field=operation_type&filter_value=50&size=100&type=agg_by_risk").then(e => e.json()))[0].buckets
                const payout = (await fetch(config.getEnv().API_PATH + "account?filter_field=operation_type&filter_value=50&size=100&type=agg_by_payout").then(e => e.json()))[0].buckets
                const loss = (await fetch(config.getEnv().API_PATH + "account?filter_field=operation_type&filter_value=50&size=100&type=agg_by_loss").then(e => e.json()))[0].buckets

                for (let asset of risk) {
                    list[asset.key] = { bet_count: asset.doc_count, bet_total: asset.total_risk.value }
                }

                for (let asset of payout) {
                    Object.assign(list[asset.key], { payout_count: asset.doc_count, payout_total: asset.total_payout.value })
                }

                for (let asset of loss) {
                    list[asset.key].loss = asset.total_payout.value * (-1)
                }

                console.log(list)
                this.setState({ list, assets })
            })
    }

    render() {
        const { match } = this.props
        const { list, assets } = this.state
        return (
            <div className={classes.container}>
                <h3>Dice Stats</h3>

                <table>
                    <thead>
                        <tr>
                            <th>COIN</th>
                            <th className="text-right"># OF BETS</th>
                            <th className="text-right">TOTAL BETS</th>
                            <th className="text-right"># OF PAYOUT</th>
                            <th className="text-right">TOTAL PAYOUT</th>
                            <th className="text-right">PAID TO JACKPOT</th>
                            <th className="text-right">EST QDEX FEES</th>
                            <th className="text-right">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(list).map((asset_id) => {
                            const row = list[asset_id]
                            const asset = assets[asset_id]
                            const payout_count = row.payout_count || 0
                            const payout_total = row.payout_total || 0
                            const fee = row.bet_count * 0.01
                            return (
                                <tr key={asset_id}>
                                    <td className="text-uppercase"><a href={"object/" + asset_id}>{asset.symbol.split("0X")[0]}</a></td>
                                    <td className="text-right">{localeString(row.bet_count)}</td>
                                    <td className="text-right">{localeString(row.bet_total / Math.pow(10, asset.precision), asset.precision)}</td>
                                    <td className="text-right">{localeString(payout_count)}</td>
                                    <td className="text-right">{localeString(payout_total / Math.pow(10, asset.precision), asset.precision)}</td>
                                    <td className="text-right">{localeString(row.loss / Math.pow(10, asset.precision), asset.precision)}</td>
                                    <td className="text-right">{localeString(fee, asset.precision)}</td>
                                    <td className="text-right"><a href={`https://quantadex.com/${match.params.network}/dice?asset=${asset.symbol}`}>PLAY</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Dice;
