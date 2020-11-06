import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { TodoPropType } from '../PropTypes/TodoPropType';

import { Todo } from '../Todo';
import { Inputs } from '../Inputs';

export class TodoList extends React.Component {
  state = {
    query: '',
    visibleTodos: 'all',
  }

  filterCompleted = {
    all: () => true,
    active: todo => !todo.completed,
    completed: todo => todo.completed,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { query, visibleTodos } = this.state;
    const { todos, selectUser, selectedUserId } = this.props;
    const { handleChange, filterCompleted } = this;

    const filteredTodos = todos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase())
        && filterCompleted[visibleTodos](todo));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <Inputs
          handleChange={handleChange}
          query={query}
          visibleTodos={visibleTodos}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <Todo
                todo={todo}
                selectUser={selectUser}
                selectedUserId={selectedUserId}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(TodoPropType),
  ).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
