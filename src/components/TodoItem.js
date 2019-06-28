import React, { Component } from 'react';
import User from './User';

export default class TodoItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.data.title}</td>
        <User user={this.props.data.user} />
        <td>{this.props.data.completed}</td>
      </tr>
    )
  }
}
