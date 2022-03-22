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
    let filteredTodos = todos.filter(todo => (todo.title.includes(query.toLocaleLowerCase())));

    if (selectItems === 'Completed') {
      filteredTodos = filteredTodos.filter(item => (item.completed === true));
    }

    if (selectItems === 'Active') {
      filteredTodos = filteredTodos.filter(item => (item.completed === false));
    }

    setVisibleTodos(filteredTodos);
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
          {visibleTodos.length ? (
            <>
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
            </>

          ) : <p>No matches found</p>}
        </ul>
      </div>
    </div>
  );
};
