import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  onSelect: (userID: number) => void;
  selectedUserId: number;
};

export const TodoList: React.FC<Props> = ({ todos, onSelect, selectedUserId }) => {
  const [query, setQuery] = useState('');
  const [selectItems, setSelectItems] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    let temporaryTodos = todos.filter(todo => (todo.title.includes(query.toLocaleLowerCase())));

    if (selectItems === 'Completed') {
      temporaryTodos = temporaryTodos.filter(item => (item.completed === true));
    }

    if (selectItems === 'Active') {
      temporaryTodos = temporaryTodos.filter(item => (item.completed === false));
    }

    setVisibleTodos(temporaryTodos);
  }, [todos, query, selectItems]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <label htmlFor="search">
        Search by title
        <input
          type="text"
          id="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <select
        value={selectItems}
        onChange={(event) => setSelectItems(event.target.value)}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames('TodoList__item',
                { 'TodoList__item--unchecked': todo.completed === false },
                { 'TodoList__item--checked': todo.completed === true })}
            >
              <label htmlFor={`${todo.id}`}>
                <input
                  type="checkbox"
                  id={`${todo.id}`}
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  { 'TodoList__user-button--selected': todo.userId === selectedUserId },
                  'button',
                )}
                type="button"
                onClick={() => onSelect(todo.userId)}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
        {/* <ul className="TodoList__list">
          <li className="TodoList__item TodoList__item--unchecked">
            <label htmlFor="user2">
              <input type="checkbox" id="user2" readOnly />
              <p>delectus aut autem</p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
            >
              User&nbsp;#1
            </button>
          </li>

          <li className="TodoList__item TodoList__item--checked">
            <label htmlFor="user2">
              <input type="checkbox" id="user2" checked readOnly />
              <p>distinctio vitae autem nihil ut molestias quo</p>
            </label>

            <button
              className="TodoList__user-button button"
              type="button"
            >
              User&nbsp;#2
            </button>
          </li>
        </ul> */}
      </div>
    </div>
  );
};
