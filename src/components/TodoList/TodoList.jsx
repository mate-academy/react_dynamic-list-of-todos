import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.scss';
import { Todo } from '../Todo';

export class TodoList extends React.Component {
  state = {
    query: '',
    status: 'all',
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      query: value,
    });

    const { filterTodoByTitle } = this.props;

    filterTodoByTitle(value);
  }

  handleFilterByStatusChange = (event) => {
    const { value } = event.target;

    this.setState({
      status: value,
    });

    const { filterTodosByStatus } = this.props;

    filterTodosByStatus(value);
  }

  render() {
    const { query } = this.state;
    const { todos, selectedUserId, selectUser } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form>
          <label className="form-label">
            Find todo:
            <input
              className="form-control"
              placeholder="Type title here"
              value={query}
              onChange={this.handleChange}
            />
          </label>
          <label className="form-label">
            Filter todos by status:
            <select
              className="form-select"
              onChange={this.handleFilterByStatusChange}
              value={this.state.status}
            >
              <option value="all">all</option>
              <option value="not completed">not completed</option>
              <option value="completed">completed</option>
            </select>
          </label>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                selectedUserId={selectedUserId}
                selectUser={selectUser}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
  }).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  filterTodosByStatus: PropTypes.func.isRequired,
  filterTodoByTitle: PropTypes.func.isRequired,
};
