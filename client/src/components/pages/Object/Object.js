import React, { Component } from 'react';
import classes from './Object.scss';
import { Apis } from "@quantadex/bitsharesjs-ws";

var wsString = "wss://testnet-01.quantachain.io:8095";

class BsObject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            object: "",
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params
        Apis.instance(wsString, true, 3000, { enableOrders: false }).init_promise.then((res) => {
            Apis.instance().db_api().exec("get_objects", [[id]]).then(e => {
                return JSON.stringify(e[0], null, 4)
            }).then(e => {
                this.setState({ object: e })
            })
        })
    }

    render() {
        return (
            <div className={classes.container}>
                <h4>Object - {this.props.match.params.id}</h4>
                <pre>{this.state.object}</pre>
            </div>
        )
    }
}

export default BsObject;