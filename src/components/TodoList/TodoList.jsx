import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    search: '',
    status: '',
  }

  searcher = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  statusChanger = (event) => {
    this.setState({
      status: event.target.value,
    });
  };

  statusFilter = (todo) => {
    if (this.state.status === 'Active') {
      return !todo.completed;
    }

    if (this.state.status === 'Completed') {
      return todo.completed;
    }

    return true;
  };

  render() {
    const { todos, checkedChanger, selectUser } = this.props;
    const { search } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <div className="TodoList__filters">
            <input
              type="text"
              id="search-query"
              className="TodoList__input"
              placeholder="Type a search word"
              value={this.state.search}
              onChange={this.searcher}
            />

            <select
              className="TodoList__statusChanger"
              name="statusChanger"
              onChange={this.statusChanger}
              value={this.state.limit}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <ul className="TodoList__list">

            {todos.filter(todo => this.statusFilter(todo)).map((todo) => {
              if (
                todo.title !== null
                && todo.title
                  .toLowerCase()
                  .trim()
                  .includes(search.trim().toLowerCase())
              ) {
                return (
                  <li
                    className={
                      todo.completed
                        ? 'TodoList__item TodoList__item--checked'
                        : 'TodoList__item TodoList__item--unchecked'
                    }
                    key={todo.id}
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onClick={event => checkedChanger(todo)}
                        onKeyDown={event => checkedChanger(todo)}
                      />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className="TodoList__user-button button"
                      type="button"
                      onClick={() => selectUser(todo.userId)}
                    >
                      User&nbsp;#
                      {todo.userId}
                    </button>
                  </li>
                );
              }

              return (<></>);
            })}
          </ul>
        </div>
      </div>

    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  checkedChanger: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
};
