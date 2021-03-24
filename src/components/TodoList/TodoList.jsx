import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    inputValue: '',
    selectValue: 'all',
  };

  componentDidUpdate(_, prevState) {
    const { handleFilterBySearching, handleSelectFilter } = this.props;

    if (prevState.inputValue !== this.state.inputValue) {
      handleFilterBySearching(this.state.inputValue);
    }

    if (prevState.selectValue !== this.state.selectValue) {
      handleSelectFilter(this.state.selectValue);
    }
  }

  changeInpuValue = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  changeSelectValue = (event) => {
    this.setState({ selectValue: event.target.value });
  };

  render() {
    const { todos, handleSelectedUser } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          placeholder="title..."
          value={this.state.inputValue}
          onChange={this.changeInpuValue}
        />
        <select
          onChange={this.changeSelectValue}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="complited">Complited</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                className={
                  classNames('TodoList__item',
                    { 'TodoList__item--unchecked': !todo.completed },
                    { 'TodoList__item--checked': todo.completed })
                }
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
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
                  onClick={() => {
                    handleSelectedUser(todo.userId);
                  }}
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
  handleSelectedUser: PropTypes.func.isRequired,
  handleSelectFilter: PropTypes.func.isRequired,
  handleFilterBySearching: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
};
