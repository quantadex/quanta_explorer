import React, { Component } from 'react';
import classes from '@quanta/styles/pagination.scss';

class Pagination extends Component {

    render() {
        var arr = [];
        let start = 1
        let end = this.props.length

        if (this.props.length > 7) {
            end = Math.max(Math.min(this.props.current + 3, this.props.length), 7)
            start = Math.min(Math.max(this.props.current - 4, 0), this.props.length - 7)
        }

        for (let i = start; i < end; i++) {
            arr.push(i)
        }

        return (
            <div className={classes.paginate + " d-flex justify-content-center"}>
                <div className={classes.pagenum + (this.props.current === 1 ? " d-none" : "")}
                    onClick={() => { this.props.onClick(this.props.current - 1) }}>Prev</div>
                <div className={classes.pagenum + (start === 0 ? " d-none" : "")}
                    onClick={() => { this.props.onClick(1) }}>First</div>
                {arr.map(i => {
                    let index = i + 1
                    return (
                        <div key={index} className={classes.pagenum + (index === this.props.current ? " " + classes.active : "")}
                            onClick={() => this.props.onClick(index)}>{index}</div>
                    )
                })}
                <div className={classes.pagenum + (end >= this.props.length ? " d-none" : "")}
                    onClick={() => { this.props.onClick(this.props.length) }}>Last</div>
                <div className={classes.pagenum + (this.props.current === this.props.length ? " d-none" : "")}
                    onClick={() => { this.props.onClick(this.props.current + 1) }}>Next</div>
            </div>
        )
    }
}

export default Pagination