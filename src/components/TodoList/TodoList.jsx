import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.PureComponent {
  state = {
    selectedStatus: '',
    filteredTitle: '',
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  searchedTodos = (todo) => {
    if (todo.title === null) {
      return todo.title;
    }

    return todo.title.includes(this.state.filteredTitle);
  }

  selectedByStatus = (todo) => {
    if (this.state.selectedStatus === 'completed') {
      return todo.completed;
    }

    if (this.state.selectedStatus === 'active') {
      return !todo.completed;
    }

    return todo;
  }

  render() {
    const { todos, selectUser, selectedUserId, changeStatus } = this.props;
    const { selectedStatus, filteredTitle } = this.state;
    const filteredTodos = todos
      .filter(this.searchedTodos).filter(this.selectedByStatus);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          className="form-control"
          name="filteredTitle"
          value={filteredTitle}
          placeholder="Filter"
          onChange={this.handleChange}
        />

        <select
          className="form-select"
          name="selectedStatus"
          value={selectedStatus}
          onChange={this.handleChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                className={classNames(`TodoList__item`,
                  {
                    'TodoList__item--unchecked': todo.completed === false,
                    'TodoList__item--checked': todo.completed === true,
                  })}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    onClick={()=> changeStatus(todo.id)}
                    readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(`TodoList__user-button`, `button`,
                    { 'TodoList__user-button--selected':
                      todo.userId === selectedUserId })}
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                >
                  User&nbsp;
                  {todo.userId}
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  changeStatus: PropTypes.func.isRequired,
};
