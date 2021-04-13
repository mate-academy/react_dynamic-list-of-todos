import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import className from 'classnames';

export class TodoList extends React.Component {
  state ={
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
      checkedHandler,
      selectUserHandler,
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
        <form
          className="TodoList__form"
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Search todos"
            id="outlined-size-small"
            name="inputTitle"
            value={inputTitle}
            variant="outlined"
            onChange={this.handleInputChange}
          />

          <Select
            className="selectMenu"
            variant="outlined"
            name="defaultSelect"
            value={defaultSelect}
            onChange={this.handleInputChange}
          >
            <MenuItem
              name="all"
              value="Show All"
            >
              Show All
            </MenuItem>
            <MenuItem
              name="completed"
              value="Show Completed"
            >
              Show Completed
            </MenuItem>
            <MenuItem
              name="active"
              value="Show Active"
            >
              Show Active
            </MenuItem>
          </Select>
        </form>
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
                onClick={() => {
                  selectUserHandler(todo.userId);
                }}
                type="button"
              >
                {`User ${todo.userId}`}
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
  checkedHandler: PropTypes.func.isRequired,
  selectUserHandler: PropTypes.func.isRequired,
};
