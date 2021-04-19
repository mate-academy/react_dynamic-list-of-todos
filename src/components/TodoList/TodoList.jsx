import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    inputTitle: '',
    defaultSelect: 'Show All',
  }

  fitterByTitle = (todo) => {
    const { inputTitle } = this.state;

    return todo.title.toLowerCase()
      .includes(inputTitle.toLowerCase());
  }

  handleInput = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  filterByStatus = (todo) => {
    const { defaultSelect } = this.state;

    switch (defaultSelect) {
      case 'Show Completed':
        return todo.completed;
      case 'Show Active':
        return !todo.completed;
      default:
        return true;
    }
  }

  render() {
    const {
      todos,
      checkedHandler,
      selecUser,
      randomizTodo,
    } = this.props;

    const {
      inputTitle,
      defaultSelect,
    } = this.state;

    const filterTodos = todos
      .filter(this.fitterByTitle)
      .filter(this.filterByStatus);

    return (
      <div className="TodoList">
        <h2>{`Todos: ${filterTodos.length}`}</h2>
        <div className="TodoList__box">
          <button
            className="
            TodoList__user-button
            TodoList__user-button--selected
            button
            "
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => {
              randomizTodo(todos);
            }}
          >
            Random
          </button>
          <form className="TodoList__form">
            <input
              className="TodoList__input"
              label="Search todos"
              name="inputTitle"
              id="outline-size-small"
              value={inputTitle}
              onChange={this.handleInput}
            />
            <select
              className="TodoList__select"
              name="defaultSelect"
              value={defaultSelect}
              onChange={this.handleInput}
            >
              <option value="Show All">
                Show All
              </option>
              <option value="Show Completed">
                Show Completed
              </option>
              <option value="Show Active">
                Show Active
              </option>
            </select>
          </form>
        </div>
        <ul className="TodoList__list">
          {filterTodos.map(todo => (
            <li
              key={todo.id}
              className={className('TodoList__item', {
                'TodoList__item--checked': todo.completed === true,
                ' TodoList__item--unchecked': todo.completed === false,
              })}
            >
              <label>
                <input
                  type="checkbox"
                  name="completed"
                  onChange={() => checkedHandler(todo.id)}
                  checked={todo.completed}
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
                onClick={() => {
                  selecUser(todo.userId);
                }}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))
          }
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  checkedHandler: PropTypes.func.isRequired,
  selecUser: PropTypes.func.isRequired,
  randomizTodo: PropTypes.func.isRequired,
};
