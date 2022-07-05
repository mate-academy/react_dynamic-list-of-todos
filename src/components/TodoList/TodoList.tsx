import React, { useState, useEffect } from 'react';
import './TodoList.scss';
import { requestTodos } from '../../api/api';

type Props = {
  selectedUserId: number,
  setSelectedUserId: (userId: number) => void,
};

// eslint-disable-next-line max-len
export const TodoList: React.FC<Props> = ({ selectedUserId, setSelectedUserId }) => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [query, setQuery] = useState('');
  const [selectedQuery, setSelectedQuery] = useState('');

  const filterTodos = todos
    .filter(todo => todo.title.includes(query))
    .filter(todo => {
      switch (selectedQuery) {
        case 'active':
          return todo.completed === false;

        case 'completed':
          return todo.completed === true;

        default:
          return todo;
      }
    });

  useEffect(() => {
    requestTodos()
      .then(todosFromServer => setTodos(todosFromServer));
  }, []);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        data-cy="filterByTitle"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by title"
      />

      <select
        value={selectedQuery}
        onChange={(event) => setSelectedQuery(event.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <div className="TodoList__list-container">
        <ul data-cy="listOfTodos" className="TodoList__list">
          {filterTodos.map((todo: Todo) => (
            <li
              key={todo.id}
              className={
                todo.completed
                  ? 'TodoList__item TodoList__item--checked'
                  : 'TodoList__item TodoList__item--unchecked'
              }
            >
              <label>
                <input
                  checked={todo.completed}
                  type="checkbox"
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={
                  selectedUserId === todo.userId
                  // eslint-disable-next-line max-len
                    ? 'TodoList__user-button TodoList__user-button--selected button'
                    : 'TodoList__user-button button'
                }
                type="button"
                onClick={() => {
                  if (todo.userId !== selectedUserId) {
                    setSelectedUserId(todo.userId);
                  }
                }}
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
};
