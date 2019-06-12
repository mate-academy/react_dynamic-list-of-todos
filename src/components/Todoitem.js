import React, { Component } from "react";
import User from "./User";

class TodoItem extends Component {
  render() {
      return (
      <tr className={this.props.data.completed ? 'completed' : 'uncompleted'}>
        <User users={this.props.data.user} />
        <td>{this.props.data.title}</td>
        <td>{this.props.data.completed ? 'completed' : 'uncompleted'}</td>
      </tr>
    );
  }
}

export default TodoItem;
