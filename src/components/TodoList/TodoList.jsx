import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { SearchField } from '../SearchField';

export class TodoList extends React.Component {
  state = {
    selectedTodoId: 0,
    query: '',
    status: '',
  }

  handleFilterChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  handleChange = (event) => {
    this.setState({
      status: event.target.value,
    });
  };

  filterByTitle = (todo) => {
    const { query } = this.state;

    if (todo.title !== null) {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    }

    return null;
  }

  filterByStatus = (todo) => {
    const { status } = this.state;

    if (status === 'completed') {
      return todo.completed;
    }

    if (status === 'active') {
      return !todo.completed;
    }

    return true;
  };

  selectedUser(todoId, userId) {
    this.setState({ selectedTodoId: todoId });
    this.props.selectUser(userId);
  }

  render() {
    const {
      filterByTitle,
      filterByStatus,
      handleChange,
      handleFilterChange,
    } = this;
    const { todos } = this.props;
    const { query, status } = this.state;

    const filtredTodos = todos.filter(filterByTitle).filter(filterByStatus);

    return (
      <div className="TodoList">
        <SearchField
          handleFilterChange={handleFilterChange}
          handleChange={handleChange}
          query={query}
          status={status}
        />
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filtredTodos.map(todo => (
              <li
                className={todo.completed
                  ? 'TodoList__item TodoList__item--unchecked'
                  : 'TodoList__item TodoList__item--checked'}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  onClick={() => this.selectedUser(todo.id, todo.userId)}
                  className={this.state.selectedTodoId !== todo.id
                    ? `TodoList__user-button
                      TodoList__user-button--unselected
                      button`
                    : `TodoList__user-button
                      TodoList__user-button--selected
                      button`
                  }
                  type="button"
                >
                  User&nbsp;#
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

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: true,
    title: null,
    userId: null,
    id: null,
  })),
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ),
  selectUser: PropTypes.func.isRequired,
};
