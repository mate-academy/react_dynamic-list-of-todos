import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchTodo from '../SearchTodo/SearchTodo';
import { TodoShape } from '../TodoShape/TodoShape';

export class TodoList extends React.PureComponent {
  state = {
    search: '',
    visibleTodos: 'All',
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  filterBySelect = (todo, status) => {
    if (status === 'Completed') {
      return todo.completed;
    }

    if (status === 'Active') {
      return !todo.completed;
    }

    return true;
  };

  render() {
    const {
      todos,
      selectUser,
      selectedUserId,
      isError,
      isLoading,
    } = this.props;
    const { search, visibleTodos } = this.state;

    if (isLoading) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (isError) {
      return (
        <div>
          <h1>Server has problem</h1>
        </div>
      );
    }

    const filteredTodos = todos.filter(todo => todo.title.includes(search)
      && this.filterBySelect(todo, visibleTodos));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <SearchTodo
            todos={todos}
            handleChange={this.handleChange}
            search={search}
            visibleTodos={visibleTodos}
          />

          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={
                  `TodoList__item ${todo.completed
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked'}`
                }
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      // eslint-disable-next-line max-len
                      'TodoList__user-button--selected': todo.userId === selectedUserId,
                    },
                  )}
                  type="button"
                  onClick={() => selectUser((todo.userId))}
                >
                  {`User #${todo.userId}`}
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
  todos: PropTypes.arrayOf(PropTypes.shape(TodoShape)),
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
