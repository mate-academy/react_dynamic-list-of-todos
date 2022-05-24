import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../react-app-env';

import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  setSelectedUserId: (id: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedUserId,
  selectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [selectedTodos, setSelectedTodos] = useState('');

  const getVisibleTodos = () => {
    switch (selectedTodos) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const visibleTodos = getVisibleTodos();

  const filteredVisibleTodos = visibleTodos.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onChangeSelected = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTodos(event.target.value);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <label>
          <input
            type="text"
            value={query}
            data-cy="filterByTitle"
            onChange={onChangeInput}
          />
        </label>
        <select
          className="TodoList__select"
          value={selectedTodos}
          onChange={onChangeSelected}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {
            filteredVisibleTodos.map(todo => (
              <>
                <li
                  className={`
                    TodoList__item
                    TodoList__item--${todo.completed}
                  `}
                  key={todo.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      defaultChecked={todo.completed}
                      disabled
                    />
                    <p>{todo.title}</p>
                  </label>
                  {todo.userId && (
                    <button
                      type="button"
                      data-cy="userButton"
                      className={classNames(
                        'button',
                        'TodoList__user - button',
                        {
                          'TodoList__user-button--selected':
                            selectedUserId === todo.userId,
                        },
                      )}
                      onClick={() => (
                        setSelectedUserId(todo.userId)
                      )}
                    >
                      {`User ${selectedUserId}`}
                    </button>
                  )}
                </li>
              </>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
