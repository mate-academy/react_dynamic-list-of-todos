import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../types';

type Props = {
  todos: Todo[],
  setSelectedUserId: (userId: number) => void,
  selectedTodoId: number,
  setSelectedTodoId: (todoId: number) => void,
};

function randomArr(arr: Todo[]) {
  return arr.sort(() => Math.random() - 0.5);
}

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  setSelectedUserId,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // const lowerCaseQuery = query.toLowerCase();

    setVisibleTodos(todos.filter(todo => {
      if (!todo.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      switch (selectValue) {
        case 'all':
          return true;

        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    }));
  }, [todos, query, selectValue]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        value={query}
        placeholder="Search by title"
        className="TodoList__input"
        onChange={event => setQuery(event.target.value)}
      />

      <select
        value={selectValue}
        onChange={event => setSelectValue(event.target.value)}
        className="TodoList__button"
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <button
        className="TodoList__select"
        type="button"
        onClick={() => setVisibleTodos(randomArr([...visibleTodos]))}
      >
        Randomize
      </button>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
            >
              <label htmlFor={`todo${todo.id}`}>
                <input
                  type="checkbox"
                  id={`todo${todo.id}`}
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  'button',
                  {
                    'TodoList__user-button--selected':
                    todo.id === selectedTodoId,
                  },
                )}
                type="button"
                onClick={() => {
                  setSelectedTodoId(todo.id);
                  setSelectedUserId(todo.userId);
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
});
