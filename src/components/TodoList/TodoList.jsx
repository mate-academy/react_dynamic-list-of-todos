import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import { TodoListInput } from '../TodoListInput/TodoListInput';

import './TodoList.scss';

export class TodoList extends React.PureComponent {
  state = {
    search: '',
    visibleTodos: 'all',
  }

  filter = {
    all: () => true,
    completed: todo => todo.completed,
    active: todo => !todo.completed,
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { todos, selectedUserId, selectUser } = this.props;
    const { search, visibleTodos } = this.state;
    const renderedTodos = todos.filter(todo => (
      todo.title.includes(search) && this.filter[visibleTodos](todo)
    ));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <TodoListInput
          handleChange={this.handleChange}
          searchValue={search}
          selectValue={visibleTodos}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              renderedTodos.map(todo => (
                <li
                  key={todo.id}
                >
                  <Todo
                    todo={todo}
                    selectUser={selectUser}
                    selectedUserId={selectedUserId}
                  />
                </li>
              ))
            }
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
      userId: PropTypes.number,
      title: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
