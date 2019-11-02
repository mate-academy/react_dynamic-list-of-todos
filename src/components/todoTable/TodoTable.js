import React from 'react';
import {Button, Table} from 'semantic-ui-react';
import TodoItem from '../TodoItem/TodoItem';

class TodoTable extends React.PureComponent {
  state = {
    todosWithUser: [],
  };

  componentDidMount() {
    const {todos, users} = this.props;
    this.setState({
      todosWithUser: this.getTodosWithUser(todos, users),
    });
  }

  getTodosWithUser = (todos, users) => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  };

  sortTodosByFilter = (filter) => {
    this.setState((prevState) => {
      const newTodoList = [...prevState.todosWithUser];

      if (filter === 'title') {
        newTodoList.sort((a, b) => a.title.localeCompare(b.title));
      } else if (filter === 'userName') {
        newTodoList.sort((a, b) => a.user.name.localeCompare(b.user.name));
      } else if (filter === 'completed') {
        newTodoList.sort((a, b) => b.completed - a.completed);
      }

      return ({
        todosWithUser: newTodoList,
      });
    });
  }

  render() {
    return (
      <>
        <section className="sortButtonsContainer">
          <Button secondary onClick={this.sortTodosByFilter.bind(this, 'title')}>Sort by title</Button>
          <Button secondary onClick={this.sortTodosByFilter.bind(this, 'userName')}>Sort by user name</Button>
          <Button secondary onClick={this.sortTodosByFilter.bind(this, 'completed')}>Sort by completed</Button>
        </section>
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
