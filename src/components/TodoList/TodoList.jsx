import React from 'react';
import './TodoList.scss';

import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    filterName: 'all',
  };

  handleQueryChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      filterName: event.target.value,
    });
  }

  render() {
    const { query, filterName } = this.state;
    const { todos, onUserSelect } = this.props;
    const normalizeQuery = query.toLowerCase();
    let preparedTodos;

    switch (filterName) {
      case 'active':
        preparedTodos = this.props.todos.filter(
          todo => todo.completed === false,
        );
        break;
      case 'completed':
        preparedTodos = this.props.todos.filter(
          todo => todo.completed === true,
        );
        break;
      default:
        preparedTodos = todos;
    }

    const filterTodos = preparedTodos.filter(todo => todo.title)
      .filter(todo => todo.title.toLowerCase().includes(normalizeQuery));

    const todosToRender = this.state.query
      ? filterTodos
      : preparedTodos;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          onChange={this.handleQueryChange}
        />
        <select
          value={this.state.filterName}
          onChange={this.handleSelectChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed </option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosToRender.map(todo => (
              <li
                className={`${!todo.completed
                  ? 'TodoList__item TodoList__item--unchecked'
                  : 'TodoList__item TodoList__item--checked'}`}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>
                <button
                  className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
                  type="button"
                  onClick={() => onUserSelect(todo.userId)}
                >
                  {`User:#${todo.userId}`}
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
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
  })).isRequired,
  onUserSelect: PropTypes.func.isRequired,
};
