import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todos } from '../../types/Todos';
import './TodoList.scss';

interface Props {
  selectUser: (userId:number) => void,
  todos: Todos[],
  selectedUserId: number,
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  selectedUserId,
}) => {
  const [newTodos, setNewTodos] = useState(todos);
  const [query, setQuery] = useState('');
  const [select, setSelect] = useState('all');

  useEffect(() => {
    const getTodosFilter = () => {
      return todos.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    };

    const todosFilter = getTodosFilter();

    const todosSelect = () => {
      switch (select) {
        case 'active':
          return todosFilter.filter(todo => !todo.completed);
          break;
        case 'completed':
          return todosFilter.filter(todo => todo.completed);
          break;
        default:
          return todosFilter;
      }
    };

    setNewTodos(todosSelect());
  }, [todos, query, select]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <div className="TodoList__form">
          <label>
            <input
              className="TodoList__input"
              type="text"
              data-cy="filterByTitle"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
            <span>&#128269;</span>
          </label>
          <select
            value={select}
            onChange={(event) => setSelect(event.target.value)}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <ul className="TodoList__list" data-cy="listOfTodos">
          {newTodos.map(todo => (
            <li
              key={todo.id}
              className={
                classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )
              }
            >
              <label>
                {todo.completed ? (
                  <input
                    type="checkbox"
                    readOnly
                    checked
                  />
                ) : (
                  <input
                    type="checkbox"
                    readOnly
                  />
                )}
                <p>
                  {todo.title}
                </p>
              </label>
              <button
                className={
                  classNames(
                    'TodoList__user-button button',
                    {
                      'TodoList__user-button--selected':
                      todo.userId === selectedUserId,
                    },
                  )
                }
                type="button"
                data-cy="userButton"
                onClick={
                  () => {
                    selectUser(todo.userId);
                  }
                }
              >
                User&nbsp;
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
