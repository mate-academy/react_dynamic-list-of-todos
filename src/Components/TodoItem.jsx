import React, { Component } from 'react'

export default class TodoItem extends Component {
  render() {
    return (
        <tbody>
          <tr className={this.props.item.completed === true ? 'green' : 'red'}>
            <td>{this.props.item.title}</td>
            <td>{this.props.item.completed === true ? `completed` : `not completed`}</td>
            <td>{this.props.item.user.name}</td>
          </tr>
        </tbody>
    )
  }
}
