import React from 'react';
import {Button, Table } from 'semantic-ui-react';
import TodoItem from '../TodoItem/TodoItem';
import SortButtons from '../sortButtons/SortButtons';

class TodoTable extends React.PureComponent {
  state = {
    todosWithUser: this.getTodosWithUses(this.props.todos, this.props.users),
  };

  getTodosWithUses(todos, users){
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  }

  sortTodosByFilter = (filter) => {
    this.setState((prevState) => {
      const newTodoList = [...prevState.todosWithUser];

      switch (filter) {
        case 'title':
          newTodoList.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'userName':
          newTodoList.sort((a, b) => a.user.name.localeCompare(b.user.name));
          break;
        case 'completed':
          newTodoList.sort((a, b) => b.completed - a.completed);
          break;
      }

      return ({
        todosWithUser: newTodoList,
      });
    });
  };

  render() {
    return (
      <>
        <SortButtons
          titleSort={this.sortTodosByFilter.bind(this, 'title')}
          userNameSort={this.sortTodosByFilter.bind(this, 'userName')}
          completedSort={this.sortTodosByFilter.bind(this, 'completed')}
        />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Todo item</Table.HeaderCell>
              <Table.HeaderCell>User name</Table.HeaderCell>
              <Table.HeaderCell>Is completed</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.todosWithUser.map(todo => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                isCompleted={todo.completed}
                user={todo.user}
              />
            ))}
          </Table.Body>
        </Table>
      </>
    );
  }
}

export default TodoTable;
