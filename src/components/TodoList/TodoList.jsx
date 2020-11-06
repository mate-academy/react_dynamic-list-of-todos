import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import { TodoPropTypes } from '../propTypes/TodoPropTypes';
import { Todo } from '../Todo';
import { TodoListControllers } from '../TodoListControllers';

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

        <TodoListControllers
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
    PropTypes.shape(TodoPropTypes),
  ).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
