import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import './TodoList.scss';

export class TodoList extends React.Component {
  initialTodos = this.props.todos
    .filter(todo => todo.title && todo.userId);

  state = {
    filteredTodos: this.initialTodos,
    searchValue: '',
    defaultSelectValue: 'All',
  }

  searchByTitle = (event) => {
    const searchWorld = event.target.value.toLowerCase();

    this.setState({
      searchValue: event.target.value,
      filteredTodos: [...this.initialTodos]
        .filter(todo => todo.title.toLowerCase().includes(searchWorld)),
      defaultSelectValue: 'All',
    });
  }

  showComplete = (event) => {
    const { searchValue } = this.state;
    const searchWorld = searchValue.toLocaleLowerCase();

    this.setState({
      defaultSelectValue: event.target.value,
      filteredTodos: this.initialTodos
        .filter(todo => (
          todo.completed && todo.title.toLowerCase().includes(searchWorld)
        )),
    });
  }

  showActive = (event) => {
    const { searchValue } = this.state;
    const searchWorld = searchValue.toLocaleLowerCase();

    this.setState({
      defaultSelectValue: event.target.value,
      filteredTodos: this.initialTodos
        .filter(todo => (
          !todo.completed && todo.title.toLowerCase().includes(searchWorld)
        )),
    });
  }

  showAll = (event) => {
    const { searchValue } = this.state;
    const searchWorld = searchValue.toLocaleLowerCase();

    this.setState({
      defaultSelectValue: event.target.value,
      filteredTodos: this.initialTodos
        .filter(todo => todo.title.toLowerCase().includes(searchWorld)),
    });
  }

  handleSelectChange = (event) => {
    const { value } = event.target;

    switch (value) {
      case 'Complete':
        this.showComplete(event);

        break;
      case 'Active':
        this.showActive(event);

        break;
      case 'All':
        this.showAll(event);

        break;
      default:
        break;
    }
  }

  shuffle = () => {
    const { filteredTodos } = this.state;
    const shuffleData = [...filteredTodos];
    let currentIndex = shuffleData.length - 1;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * (currentIndex - 1));
      const temporaryValue = shuffleData[currentIndex];

      shuffleData[currentIndex] = shuffleData[randomIndex];
      shuffleData[randomIndex] = temporaryValue;
      currentIndex -= 1;
    }

    this.setState({ filteredTodos: shuffleData });
  }

  render() {
    const { selectUser, selectedUserId } = this.props;
    const {
      filteredTodos,
      searchValue,
      defaultSelectValue,
    } = this.state;

    return (
      <div className="TodoList">
        <h2>{`Todos: ${filteredTodos.length}`}</h2>
        <form className="TodoList__form">
          <TextField
            id="outlined-basic"
            label="Search by title"
            variant="outlined"
            value={searchValue}
            onChange={this.searchByTitle}
          />
          <FormControl variant="outlined">
            <InputLabel
              id="demo-simple-select-outlined-label"
            >
              Show Todos
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={defaultSelectValue}
              onChange={this.handleSelectChange}
              label="Show Todos"
            >
              <MenuItem value="Complete">Completed</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="All">All</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="button"
            onClick={this.shuffle}
            variant="outlined"
            color="secondary"
          >
            Randomize!!!
          </Button>
        </form>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            { filteredTodos.map(todo => (
              <li
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{ todo.title }</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected':
                        selectedUserId === todo.userId,
                    },
                  )}
                  type="button"
                  onClick={() => selectUser(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            )) }
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool,
      id: PropTypes.number.isRequired,
      userId: PropTypes.number,
      createdAt: PropTypes.string.isRequired,
      title: PropTypes.string,

    }).isRequired,
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
