import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

let sortStatus = 1;

class TodoList extends React.Component {
  constructor({ todos }) {
    super();
    this.todos = todos;

    this.state = {
      sortTotos: [...this.todos],
    };
  }

  sort = (fieldOfSort, todos, sortWay) => {
    let funcSort;
    switch (fieldOfSort) {
      case 'Status':
        funcSort = (a, b) => sortWay * (a.completed - b.completed);
        break;
      case 'Todo':
        funcSort = (a, b) => sortWay * a.title.localeCompare(b.title);
        break;
      case 'User':
        funcSort = (a, b) => sortWay * a.user.name.localeCompare(b.user.name);
        break;
      default: break;
    }

    sortStatus = -sortStatus;

    this.setState({
      sortTotos: [...todos].sort(funcSort),
    });
  };

  render() {
    return (
      <table>
        <thead>
          <tr className="table-head">
            <th onClick={() => this.sort('Status', this.todos, sortStatus)}>Status</th>
            <th onClick={() => this.sort('Todo', this.todos, sortStatus)}>Todo</th>
            <th onClick={() => this.sort('User', this.todos, sortStatus)}>User</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.sortTotos.map((todo, currentIndex) => (
              <TodoItem
                {...todo}
                todos={this.todos}
                currentIndex={currentIndex}
                key={`keyTodo${todo.id}`}
              />
            ))
          }
        </tbody>
      </table>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
};

export default TodoList;
