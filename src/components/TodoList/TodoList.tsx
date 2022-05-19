import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../Types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  setUserId: (number: number) => void,
};

export const TodoList: React.FC<Props> = ({ todos, setUserId }) => {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [visibleTodoList, setVisibleTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    setVisibleTodoList(todos.filter(todo => {
      switch (selectedOption) {
        case 'All':
          return todo;
        case 'Active':
          return !todo.completed;
        case 'Completed':
          return todo.completed;
        default:
          return todo;
      }
    }));
  }, [query, todos, selectedOption]);

  const filteredTodoList = visibleTodoList.filter(
    todo => todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  const randomize = () => {
    const list = filteredTodoList;

    setVisibleTodoList(list.sort(() => 0.5 - Math.random()));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <select
        defaultValue={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
      >
        <option value="All" selected>
          All
        </option>
        <option value="Active">
          Active
        </option>
        <option value="Completed">
          Completed
        </option>
      </select>
      <button
        type="button"
        onClick={randomize}
      >
        Randomize
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodoList.map(todo => (
            <li
              key={todo.id}
              className={classNames('TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}

            >
              <label>

                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>

              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => {
                  setUserId(todo.userId);
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
