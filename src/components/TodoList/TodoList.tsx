/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { ToDo } from '../../types/Todo';
import { TodoListControlPanel } from '../TodoListContolPanel';

type Props = {
  todos: ToDo[];
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>;
  selectedUserId: number;
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  setSelectedUserId,
  selectedUserId,
}) => {
  const [filterTitle, setFilterTitle] = useState('');
  const [filterComplete, setFilterComplete] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [isRandomized, setRandomized] = useState(false);

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      const titleLower = todo.title.toLowerCase();
      const filterLower = filterTitle.toLowerCase();

      switch (filterComplete) {
        case 'all':
          return titleLower.includes(filterLower);

        case 'active':
          return titleLower.includes(filterLower) && todo.completed === false;

        case 'completed':
          return titleLower.includes(filterLower) && todo.completed === true;

        default:
          return todo;
      }
    }));
  }, [filterTitle, filterComplete, todos]);

  const randomizeTodos = useCallback((boolean: boolean) => {
    if (boolean) {
      setVisibleTodos(todos);
      setRandomized(false);

      return;
    }

    const result = [...visibleTodos];
    let currentIndex = visibleTodos.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [
        result[currentIndex],
        result[randomIndex],
      ] = [
        result[randomIndex],
        result[currentIndex],
      ];
    }

    setVisibleTodos(result);
    setRandomized(true);
  }, [isRandomized, visibleTodos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <TodoListControlPanel
        filterTitle={filterTitle}
        setFilterTitle={setFilterTitle}
        filterComplete={filterComplete}
        setFilterComplete={setFilterComplete}
        randomizeTodos={randomizeTodos}
        isRandomized={isRandomized}
      />

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>
                  {todo.title}
                </p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  {
                    'TodoList__user-button--selected':
                      selectedUserId === todo.userId,
                  },
                  'button',
                )}
                type="button"
                onClick={() => setSelectedUserId(todo.userId)}
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
});
