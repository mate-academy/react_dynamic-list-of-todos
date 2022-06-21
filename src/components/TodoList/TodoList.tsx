import React, { useState } from 'react';
import './TodoList.scss';
import cn from 'classnames';
import { OptionArray, Todo } from '../../react-app-env';

type Props = {
  todos: Todo[],
  onSelect: (userId: number) => void,
  userId: number,
};

export const TodoList: React.FC<Props> = ({ todos, onSelect, userId }) => {
  const [query, setQuery] = useState('');
  const [visibleTodos, setVisibleTodos] = useState('all');
  const options: OptionArray = ['all', 'active', 'completed'];

  const handleTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filteredQuery = todos
    .filter((todo: Todo) => todo.title.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase()));

  const filteredVisible = (allTodos: Todo[]) => {
    switch (visibleTodos) {
      case 'active': {
        return allTodos.filter(todo => todo.completed === false);
      }

      case 'completed': {
        return allTodos.filter(todo => todo.completed === true);
      }

      default: {
        return allTodos;
      }
    }
  };

  const resultGoods = filteredVisible(filteredQuery);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        value={query}
        onChange={handleTodo}
      />
      <select onChange={(event) => {
        setVisibleTodos(event.target.value);
      }}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className="TodoList__list-container">

        <ul className="TodoList__list">
          {resultGoods.map(todo => (
            <li
              className={cn('TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              key={todo.id}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className={cn('TodoList__user-button', 'button', {
                  'TodoList__user-button--selected': userId === todo.userId,
                })}
                type="button"
                onClick={() => {
                  onSelect(todo.userId);
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
