import React, { Component } from 'react'
import User from './User.jsx'

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <tr>
        <User user={this.props.item.user} />
        <td>{this.props.item.title}</td>
        <td className={this.props.item.completed ? 'td-completed' : 'td-inprogress'}>
          {this.props.item.completed ? 'completed' : 'in progress'}
        </td>
      </tr>
    )
  };
}
