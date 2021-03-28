import React, { Component } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'


export default class TableBody extends Component {
    render() {
        return (
            <div>
             <TableRow>
            <TableCell> {this.props.id}</TableCell>
            <TableCell>{this.props.userNum}</TableCell>
            <TableCell>{this.props.depth}</TableCell>
            <TableCell>{this.props.distance}</TableCell>
            <TableCell>{this.props.date}</TableCell>
        </TableRow>
            </div>
        )
    }
}
