import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

let sortStatus = 1;

class TodoList extends React.Component {
  constructor({ todos }) {
    super();
    this.todos = todos;

    this.state = {
      sortedTotos: [...this.todos],
    };
  }

  sortTotos = (event) => {
    const fieldOfSort = event.target.textContent.toLowerCase();
    const sortMethod = {
      status: (a, b) => sortStatus * (a.completed - b.completed),
      todo: (a, b) => sortStatus * a.title.localeCompare(b.title),
      user: (a, b) => sortStatus * a.user.name.localeCompare(b.user.name),
    };

    sortStatus = -sortStatus;

    this.setState({
      sortedTotos: [...this.todos].sort(sortMethod[fieldOfSort]),
    });
  };

  render() {
    const { sortedTotos } = this.state;

    return (
      <table>
        <thead>
          <tr className="table-head">
            <th onClick={this.sortTotos}>Status</th>
            <th onClick={this.sortTotos}>Todo</th>
            <th onClick={this.sortTotos}>User</th>
          </tr>
        </thead>
        <tbody>
          {
            sortedTotos.map(todo => (
              <TodoItem
                {...todo}
                todos={this.todos}
                key={todo.id}
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
