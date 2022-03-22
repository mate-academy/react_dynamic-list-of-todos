import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import './TodoList.scss';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  changeUser: (userId: number) => void;
  selectedUserId: number;
};

enum Options {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoList: React.FC<Props> = ({
  todos, changeUser, selectedUserId,
}) => {
  const [qwery, setQwery] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const finalQwery = qwery.toLowerCase();

    setVisibleTodos(todos.filter(todo => {
      if (!todo.title.includes(finalQwery)) {
        return false;
      }

      switch (selectedOption) {
        case Options.all:
          return true;

        case Options.active:
          return !todo.completed;

        case Options.completed:
          return todo.completed;

        default:
          return true;
      }
    }));
  }, [qwery, selectedOption, todos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        placeholder="Enter text"
        value={qwery}
        onChange={(event) => setQwery(event.target.value)}
      />

      <select
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
      >
        <option value="all"> All </option>
        <option value="active"> Active </option>
        <option value="completed"> Completed </option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
            >
              <label htmlFor={`${todo.id}`}>
                <input
                  type="checkbox"
                  id={`${todo.id}`}
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                  'button',
                )}
                type="button"
                onClick={() => {
                  changeUser(todo.userId);
                }}
              >
                {`User#${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
