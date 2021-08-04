import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.scss';
import { Todo } from '../Todo';

export class TodoList extends React.Component {
  handleChange = (event) => {
    const { value } = event.target;
    const { setTitleFilter } = this.props;

    setTitleFilter(value);
  }

  handleFilterByStatusChange = (event) => {
    const { value } = event.target;
    const { setStatusFilter } = this.props;

    setStatusFilter(value);
  }

  render() {
    const { todos, selectedUserId, selectUser, query, status } = this.props;
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
  query: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  setTitleFilter: PropTypes.func.isRequired,
  setStatusFilter: PropTypes.func.isRequired,
};
