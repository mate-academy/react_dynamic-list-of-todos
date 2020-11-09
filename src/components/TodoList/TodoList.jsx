import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SearchTodo from '../SearchTodo/SearchTodo';
import { TodoShape } from '../TodoShape/TodoShape';
import Todo from '../Todo/Todo';

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
      hasError,
      hasLoading,
    } = this.props;
    const { search, visibleTodos } = this.state;

    if (hasLoading) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (hasError) {
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
                className={classNames({
                  TodoList__item: true,
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <Todo
                  {...todo}
                  selectedUserId={selectedUserId}
                  selectUser={selectUser}
                />
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
  hasError: PropTypes.bool.isRequired,
  hasLoading: PropTypes.bool.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
