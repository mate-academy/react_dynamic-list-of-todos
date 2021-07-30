import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classnames from 'classnames';

class TodoList extends React.Component {
  state = {
    inputValue: '',
    selectValue: 'all',
  }

  prepereTodoByValue = () => this.props.todos
    .filter(todo => todo.title && todo.title.includes(this.state.inputValue))

  prepereTodoBySelect = (value) => {
    if (value === 'all') {
      return this.prepereTodoByValue();
    }

    return this.prepereTodoByValue()
      .filter(todo => (value === 'completed'
        ? todo.completed
        : !todo.completed));
  }

  handlerChangeInput = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <input
            className="input"
            name="inputValue"
            value={this.state.inputValue}
            onChange={this.handlerChangeInput}
          />
          <select
            name="selectValue"
            onChange={this.handlerChangeInput}
          >
            <option value="all">
              All
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
              Completed
            </option>
          </select>

          <ul className="TodoList__list">
            {this.prepereTodoBySelect(this.state.selectValue).map(todo => (
              <li
                key={todo.id}
                className={classnames(
                  'TodoList__item', {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )
              }
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
                  onClick={() => this.props.selectedUser(todo.userId)}
                  className={classnames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected':
                       todo.userId === this.props.selectedUserId,
                    },
                  )}
                  type="button"
                >
                  {todo.userId}
                  #
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
  selectedUserId: PropTypes.number.isRequired,
  selectedUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
  })),
};

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: null,
    completed: false,
    title: null,
    userId: null,
  })),
};

export default TodoList;
