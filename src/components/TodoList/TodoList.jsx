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
    const { status } = this.state;
    const { filterTodos } = this.props;

    this.setState({
      query: value,
    });

    filterTodos(value, status);
  }

  handleFilterByStatusChange = (event) => {
    const { value } = event.target;
    const { query } = this.state;
    const { filterTodos } = this.props;

    this.setState({
      status: value,
    });

    filterTodos(query, value);
  }

  render() {
    const { query, status } = this.state;
    const { todos, selectedUserId, selectUser } = this.props;
    const { handleChange, handleFilterByStatusChange } = this;

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
              onChange={handleChange}
            />
          </label>
          <label className="form-label">
            Filter todos by status:
            <select
              className="form-select"
              onChange={handleFilterByStatusChange}
              value={status}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
};
