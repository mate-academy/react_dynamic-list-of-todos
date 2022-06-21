import React, { useState, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import './TodoList.scss';
import { getTodos } from '../../api/api';
import { Todo } from '../../react-app-env';

type Props = {
  selectedUserId: (userId: number) => void,
  currentUserId: number,
};

enum SelectByType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoList: React.FC<Props> = ({
  selectedUserId,
  currentUserId,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectBy, setSelectBy] = useState(SelectByType.All);

  useEffect(() => {
    getTodos()
      .then(todosPrepare => setTodos(todosPrepare));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
  }, [todos, query]);

  const selectTodos = visibleTodos.filter(todo => {
    switch (selectBy) {
      case SelectByType.Active:
        return !todo.completed;

      case SelectByType.Completed:
        return todo.completed;

      case SelectByType.All:
      default:
        return todo;
    }
  });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        className="TodoList__input"
        data-cy="filterByTitle"
        placeholder="Please enter a title"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />

      <select
        value={selectBy}
        className="TodoList__select"
        onChange={(event) => {
          setSelectBy(event.target.value as SelectByType);
        }}
      >
        <option value="all" disabled>Choose select</option>
        <option value="all">All Todos</option>
        <option value="active">Active Todos</option>
        <option value="completed">Completed Todos</option>
      </select>

      <button
        type="button"
        className="
        TodoList__user-button
        button
        TodoList__user-button--selected
        TodoList__user-button--random
        "
        onClick={() => {
          setTodos(prevTodos => [...prevTodos]
            .sort(() => Math.random() - 0.5));
        }}
      >
        Randomize
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {selectTodos.map(todo => (
            <li
              className={classnames('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classnames('TodoList__user-button', 'button', {
                  // eslint-disable-next-line max-len
                  'TodoList__user-button--selected': todo.userId === currentUserId,
                })}
                type="button"
                data-cy="userButton"
                onClick={() => {
                  selectedUserId(todo.userId);
                }}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
