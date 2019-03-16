import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Object.scss';
import { Apis } from "@quantadex/bitsharesjs-ws";
import CONFIG from '@quanta/config';

class BsObject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            object: "",
        };
    }

    getObject(id) {
        Apis.instance().db_api().exec("get_objects", [[id]]).then(async e => {
            let data = JSON.stringify(e[0], null, 4)

            if (data === "null") {
                data = await fetch(CONFIG.ENVIRONMENT[this.props.environmentType.value].API_PATH + `account?filter_field=operation_history__op_object__order_id&filter_value=${id}`)
                    .then(e => e.json())
                    .then(e => {
                        return e[0] && JSON.stringify(e[0].operation_history.op_object, null, 4) || "null"
                    })
            }

            return data
        }).then(e => {
            this.setState({ object: e, id: id })
        })
    }

    componentDidMount() {
        const { id } = this.props.match.params
        Apis.instance(CONFIG.ENVIRONMENT[this.props.environmentType.value].WEBSOCKET_PATH, true, 3000, { enableOrders: false }).init_promise.then((res) => {
            this.getObject(id)
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.state.id) {
            this.getObject(nextProps.match.params.id)
        }
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

const mapStateToProps = state => ({
    environmentType: state.header.environmentType,
});

export default connect(mapStateToProps)(BsObject);