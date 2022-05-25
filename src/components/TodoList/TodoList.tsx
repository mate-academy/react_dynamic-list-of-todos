import React, { ChangeEvent, useState } from 'react';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  onSelect: (id: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
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

      <div>
        <label>
          <input
            type="text"
            value={query}
            data-cy="filterByTitle"
            placeholder="Type search word"
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
      </div>

      <div className="TodoList__list-container">
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
                    ${todo.completed
                ? 'TodoList__item--checked'
                : 'TodoList__item--unchecked'
              }`}
                  key={todo.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      readOnly
                    />
                    <p>{todo.title}</p>
                  </label>
                  {todo.userId && (
                    <button
                      type="button"
                      data-cy="userButton"
                      className={`TodoList__user-button
                       ${todo.completed
                        && 'TodoList__user-button--selected'}
                        `}
                      onClick={() => (
                        onSelect(todo.userId)
                      )}
                    >
                      {`User ${todo.userId}`}
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
