import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

import { Filters } from '../Filters';

const filters = {
  All: 'All',
  Active: 'Active',
  Completed: 'Completed',
};

export class TodoList extends React.Component {
  state = {
    filterStatus: filters.All,
    filterTitle: '',
    randomized: false,
    selectedUserId: 0,
  }

  handleInputChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
      randomized: false,
    });
  }

  filterByTitle = (todo) => {
    const { filterTitle } = this.state;

    if (todo.title !== null) {
      return todo.title.toLowerCase()
        .includes(filterTitle.toLowerCase());
    }

    return null;
  }

  filterByStatus = (todo) => {
    const { filterStatus } = this.state;

    switch (filterStatus) {
      case filters.Completed:
        return todo.completed;
      case filters.Active:
        return !todo.completed;
      default:
        return true;
    }
  }

  handleRandomBtn = () => {
    this.setState({
      randomized: true,
    });
  }

  render() {
    const { todos, selectUser, changeStatus } = this.props;
    const {
      filterTitle,
      filterStatus,
      randomized,
      selectedUserId,
    } = this.state;

    let filteredTodos;

    const randomize = (data) => {
      let num = data.length;
      let temp;
      let randomNum;

      while (num !== 0) {
        randomNum = Math.floor(Math.random() * num);
        num -= 1;
        temp = data[num];
        data[num] = data[randomNum];
        data[randomNum] = temp;
      }

      return data;
    };

    filteredTodos = todos
      .filter(this.filterByTitle)
      .filter(this.filterByStatus);

    if (randomized) {
      filteredTodos = randomize(filteredTodos);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <Filters
          filterTitle={filterTitle}
          filterStatus={filterStatus}
          filters={filters}
          handleChange={this.handleInputChange}
          handleBtn={this.handleRandomBtn}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                className={todo.completed
                  ? 'TodoList__item TodoList__item--checked'
                  : 'TodoList__item TodoList__item--unchecked'}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                    onClick={() => {
                      changeStatus(todo.id);
                    }}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={`TodoList__user-button button${
                    selectedUserId === todo.userId
                      ? ' TodoList__user-button--selected'
                      : ''}`
                }
                  type="button"
                  onClick={() => {
                    this.setState({
                      selectedUserId: todo.userId,
                    });
                    selectUser(todo.userId);
                  }}
                >
                  User ID#
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
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};
