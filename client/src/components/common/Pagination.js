import React, { Component } from 'react';
import classes from '@quanta/styles/pagination.scss';

class Pagination extends Component {

    render() {
        var arr;
        const a = Array.apply(null, { length: this.props.length }).map(Number.call, Number)

        let start = 0
        let end = this.props.length

        if (this.props.length > 7) {
            end = Math.max(this.props.current + 3, 7)
            start = Math.min(Math.max(this.props.current - 4, 0), this.props.length - 7)
        }

        arr = a.slice(start, end)

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