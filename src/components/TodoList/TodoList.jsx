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

    const searchByTodos = todos
      .filter(todo => todo.title.toLowerCase()
        .includes(inputTitle.toLowerCase()));
    let searchByComplited = null;

    switch (defaultSelect) {
      case 'Show Completed':
        searchByComplited = searchByTodos
          .filter(todo => todo.completed === true);
        break;

      case 'Show Active':
        searchByComplited = searchByTodos
          .filter(todo => todo.completed === false);
        break;

      default:
        searchByComplited = [...searchByTodos];
    }

    return (
      <div className="TodoList">
        <h2>{`Todos: ${searchByComplited.length}`}</h2>
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
          {searchByComplited.map(todo => (
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
