import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    todos: this.props.todos,
    value: '',
    select: '',
  }

  inputHandler = (event) => {
    const { value } = event.target;

    this.setState({
      todos: this.props.todos.filter(
        todo => todo.title.toLowerCase().includes(value.toLowerCase()),
      ),
      value,
    });
  }

  selectHandler = (event) => {
    const { value } = event.target;

    switch (value) {
      case 'active':
        this.setState({
          todos: this.props.todos.filter(todo => !todo.completed),
          select: value,
        });
        break;
      case 'completed':
        this.setState({
          todos: this.props.todos.filter(todo => todo.completed),
          select: value,
        });
        break;
      default:
      case 'all':
        break;
    }
  }

  render() {
    const { selectUser } = this.props;
    const { todos, value } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            this.inputHandler(e);
          }}
        />
        <select
          value={this.state.select}
          onChange={(event) => {
            this.selectHandler(event);
          }}
        >
          <option
            value="all"
          >
            All
          </option>
          <option
            value="active"
          >
            Active
          </option>
          <option
            value="completed"
          >
            Completed
          </option>
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
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>
                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                >
                  User
                  {' '}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
};
