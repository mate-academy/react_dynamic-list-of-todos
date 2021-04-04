import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    todos: this.props.todos,
    select: '',
  }

  filterTitle = (event) => {
    const { value } = event.target;
    const { todos } = this.props;
    const filterTodo = todos
      .filter(todo => (todo.title ? todo.title.includes(value) : false));

    this.setState({
      todos: filterTodo,
    });
  }

  handleSelection = (event) => {
    const { name, value } = event.target;
    let filterTodo = this.props.todos;

    switch (value) {
      case 'completed':
        filterTodo = filterTodo.filter(todo => todo.completed);
        break;
      case 'active':
        filterTodo = filterTodo.filter(todo => !todo.completed);
        break;
      default:
      case 'all':
        break;
    }

    this.setState({
      todos: filterTodo,
      [name]: value,
    });
  }

  render() {
    const { selectUser } = this.props;
    const { todos, select } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div>
          <input
            placeholder="Filter"
            onChange={this.filterTitle}
          />
        </div>
        <select
          name="select"
          value={select}
          onChange={this.handleSelection}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed })}
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
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
};
