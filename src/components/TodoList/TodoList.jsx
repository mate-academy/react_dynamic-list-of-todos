import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

const classNames = require('classnames');

export class TodoList extends React.Component {
  state = {
    query: '',
    isChecked: false,
    values: [],
    selectedStatus: '',
  }

  handleChange = (event) => {
    this.setState({
      selectedStatus: event.target.value,
    });
  }

  handleQuerySearch = (event) => {
    this.setState({
      query: event.target.value,
    });
  }

  handleChecking = (value) => {
    this.setState(state => ({
      checked: !state.checked,
      values: [...state.values, value],
    }));
  }

  filterTodos = (unfilteredTodos) => {
    const { selectedStatus, query } = this.state;

    return unfilteredTodos
      .filter(todo => todo.title !== '' && todo.userId !== null)
      .filter((todo) => {
        if (selectedStatus === 'active') {
          return todo.completed === false;
        }

        if (selectedStatus === 'completed') {
          return todo.completed === true;
        }

        return todo;
      })
      .filter((item) => {
        const insensitiveQuery = query.toLowerCase();
        const insensitiveTitle = item.title.toLowerCase();

        return insensitiveTitle.includes(insensitiveQuery);
      });
  }

  render() {
    const { todos, selectUser } = this.props;
    const { query, isChecked, values, selectedStatus } = this.state;
    const filteredTodos = this.filterTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          id="search-query"
          placeholder="Type search word"
          value={query}
          onChange={this.handleQuerySearch}
        />

        <select
          value={selectedStatus}
          onChange={this.handleChange}
        >
          <option value="">chose your variant</option>
          <option
            value="all"
          >
            all
          </option>
          <option
            value="active"
          >
            active
          </option>
          <option
            value="completed"
          >
            completed
          </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                }, { 'TodoList__item--unchecked': !todo.completed })}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={(isChecked && values.includes(todo.id))
                    || (todo.completed === true)}
                    onClick={() => this.handleChecking(todo.id)}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => selectUser(todo.userId)}
                >
                  {`User ${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    title: PropTypes.string,
  }).isRequired).isRequired,
  selectUser: PropTypes.func.isRequired,
};
