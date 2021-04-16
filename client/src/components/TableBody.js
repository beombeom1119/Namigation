import React, { Component } from 'react'

export default class TableBody extends Component {
    render() {
        return (
            <div>
            <table class="table">
            <th scope="row">{this.props.id}</th>
            <td>{this.props.userNum}</td>
            <td>{this.props.depth}</td>
            <td>{this.props.distance}</td>
            <td>{this.props.date}</td>
            </table>
            </div>
        )
    }
}
