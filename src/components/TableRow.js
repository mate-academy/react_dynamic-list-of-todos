import React, { Component } from 'react';
import { Icon, Table } from 'semantic-ui-react';

class TableRow extends Component {
  render() {
    const { todo, user } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{todo.title}</Table.Cell>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell positive={todo.completed} negative={!todo.completed}>
          <Icon name={`${todo.completed ? 'checkmark' : 'close'}`} />
          { todo.completed ? `Completed` : `Not completed` }
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default TableRow;
