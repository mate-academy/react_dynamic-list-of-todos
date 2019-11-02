import React from 'react';
import { Table } from 'semantic-ui-react';
import TodoItem from '../TodoItem/TodoItem';

class TodoTable  extends React.PureComponent {

  getTodosWithUser = (todos, users) => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  };

  render() {
    const {todos, users} = this.props;
    const todosWithUser = this.getTodosWithUser(todos, users);

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Todo item</Table.HeaderCell>
            <Table.HeaderCell>User email</Table.HeaderCell>
            <Table.HeaderCell>Is completed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todosWithUser.map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              isCompleted={todo.completed}
              user={todo.user}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default TodoTable;
