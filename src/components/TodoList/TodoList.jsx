import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    filterInput: '',
    selectedTodos: 'All',
  }

  handleInputChange = (event) => {
    this.setState({
      filterInput: event.target.value,
    });
  }

  handleSelectTodos = (event) => {
    this.setState({
      selectedTodos: event.target.value,
    });
  }

  filterTodos = (todos) => {
    if (this.state.selectedTodos === 'Active') {
      return todos.filter(todo => !todo.completed);
    }

    if (this.state.selectedTodos === 'Completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }

  filterbyTitle = (todos) => {
    if (this.state.filterInput !== '') {
      return todos.filter(todo => todo.title !== null)
        .filter(todo => todo.title.includes(this.state.filterInput));
    }

    return todos;
  }

  render() {
    const { todos, selectUser, selectedUserId } = this.props;

    const selectedTodos = this.filterTodos(todos);
    const filteredTodos = this.filterbyTitle(selectedTodos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <input
            className="TodoList__input"
            type="text"
            placeholder="Find Todo"
            value={this.state.filterbyTitle}
            onChange={this.handleInputChange}
          />
          <select
            value={this.state.selectedTodos}
            onChange={this.handleSelectTodos}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
          <ul className="TodoList__list">
            {
              filteredTodos.map(todo => (
                <li
                  className={`
                  TodoList__item
                  ${todo.completed
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked'}`}
                  key={todo.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                    />
                    <p>{todo.title}</p>
                  </label>
                  <button
                    className={`
                    TodoList__user-button button
                    ${selectedUserId === todo.userId
                      ? 'TodoList__user-button--selected'
                      : ''}`}
                    type="button"
                    onClick={() => selectUser(todo.userId)}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
