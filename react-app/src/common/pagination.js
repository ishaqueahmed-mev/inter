import React, { Component } from "react";
import "../classUser/user.css";

export class Pagination extends Component {
    constructor(props) {
        super(props);
        console.log('THS ', this.props)
    }

    switchPage(e) {
        // Value of `e` get passed to switchPage in list component, just like emitting in Ng
        this.props.pageChange(e); 

        // Or directly call from onClick
        // this.props.pageChange.bind(this, (i + 1))
    }

    render() {
        return (
            <div className="pagination">
                <ul>{
                    this.props.pageCounts.map((p, i) => (
                        <li key={p.toString()}>
                            <button className={`pagination-number ${this.props.currentPage === (i + 1) ? 'active disabled' : ''}`}
                                onClick={this.switchPage.bind(this, i + 1)}>{p}</button>
                        </li>
                    ))
                }
                </ul>
            </div >
        )
    }
}