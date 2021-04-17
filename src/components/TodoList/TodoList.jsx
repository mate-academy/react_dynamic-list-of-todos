import React from 'react';
import './TodoList.scss';
import className from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    inputTitle: '',
    defaultSelect: 'Show All',
  }

  handleInputChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  filterByTitle = (todo) => {
    const { inputTitle } = this.state;

    return todo.title.toLowerCase()
      .includes(inputTitle.toLowerCase());
  }

  filterByStatus = (todo) => {
    const { defaultSelect } = this.state;

    switch (defaultSelect) {
      case 'Show Completed': return todo.completed;
      case 'Show Active': return !todo.completed;
      default: return true;
    }
  }

  render() {
    const {
      todos,
      checked,
      selectUser,
      randomTodos,
    } = this.props;

    const {
      inputTitle,
      defaultSelect,
    } = this.state;

    const filterTodos = todos
      .filter(this.filterByTitle)
      .filter(this.filterByStatus);

    return (
      <div className="TodoList">
        <h2>{`Todos: ${filterTodos.length}`}</h2>
        <div className="TodoList__container">
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
              randomTodos(todos);
            }}
          >
            Randomize
          </button>
          <form
            className="TodoList__form"
          >
            <input
              className="TodoList__input"
              label="Search todos"
              id="outlined-size-small"
              name="inputTitle"
              value={inputTitle}
              onChange={this.handleInputChange}
            />

            <select
              className="TodoList__select"
              name="defaultSelect"
              value={defaultSelect}
              onChange={this.handleInputChange}
            >

              <option
                name="all"
                value="Show All"
              >
                Show All
              </option>
              <option
                name="completed"
                value="Show Completed"
              >
                Show Completed
              </option>
              <option
                name="active"
                value="Show Active"
              >
                Show Active
              </option>
            </select>
          </form>
        </div>
        <ul className="TodoList__list">
          {filterTodos.map(todo => (
            <li
              className={className(`TodoList__item`, {
                'TodoList__item--checked': todo.completed === true,
                ' TodoList__item--unchecked': todo.completed === false,
              })}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  name="completed"
                  onChange={() => checked(todo.id)}
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
                onClick={() => {
                  selectUser(todo.userId);
                }}
                type="button"
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
  checked: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  randomTodos: PropTypes.func.isRequired,
};
