import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './TodoList.scss';
import { Todo } from '../Todo/Todo';
import { Form } from '../Form/Form';

export const TodoList = (
  {
    todos,
    chooseUser,
    selectedUserId,
    todoStatus,
    setTodoStatus,
    query,
    setSearchQuery,
  },
) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <Form
      query={query}
      setSearchQuery={setSearchQuery}
      todoStatus={todoStatus}
      setTodoStatus={setTodoStatus}
    />

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {
          todos.map(todo => (
            <li
              key={todo.id}
              className={classnames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
            >
              <Todo
                {...todo}
                selectedUserId={selectedUserId}
                chooseUser={chooseUser}
              />
            </li>
          ))
        }

      </ul>
    </div>
  </div>
);

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: false,
      title: '',
      userId: 0,
    }),
  ),
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool,
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      updatedAt: PropTypes.string.isRequired,
      userId: PropTypes.number,
    }).isRequired,
  ),
  chooseUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  todoStatus: PropTypes.string.isRequired,
  setTodoStatus: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};
