import React, { useState, useEffect } from 'react';
import { getTodos } from '../../api/api';
import './TodoList.scss';

interface Prop {
  selectUserId: React.Dispatch<React.SetStateAction<number>>
}

export const TodoList: React.FC<Prop> = ({ selectUserId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [optionValue, setOptionValue] = useState(' ');

  useEffect(() => {
    getTodos()
      .then((element) => setTodos(element));
  }, []);

  const filterTodos = todos.filter(todo => todo.title.includes(query));

  const selectTodos = () => {
    let rezult;

    if (optionValue === 'active') {
      rezult = filterTodos.filter(todo => todo.completed === false);
    } else if (optionValue === 'completed') {
      rezult = filterTodos.filter(todo => todo.completed === true);
    } else {
      rezult = filterTodos;
    }

    return rezult;
  };

  return (
    <div className="TodoList">
      <input
        type="text"
        id="search-query"
        name="query"
        className="input"
        placeholder="Type search word"
        value={query}
        onChange={(event) => (
          setQuery(event.target.value)
        )}
      />
      <select
        value={optionValue}
        onChange={(event) => {
          setOptionValue(event.target.value);
        }}
      >
        <option disabled value={' '}>Choose option</option>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>

      </select>
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {selectTodos().map(todo => (
            !todo.completed
              ? (
                <li
                  key={todo.id}
                  className="TodoList__item TodoList__item--unchecked"
                >
                  <label>
                    <input type="checkbox" readOnly />
                    <p>{todo.title}</p>
                  </label>
                  <button
                    className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
                    type="button"
                    onClick={() => selectUserId(todo.userId)}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                </li>
              )
              : (
                <li
                  key={todo.id}
                  className="TodoList__item TodoList__item--checked"
                >
                  <label>
                    <input type="checkbox" checked readOnly />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="TodoList__user-button button"
                    type="button"
                    onClick={() => selectUserId(todo.userId)}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                </li>
              )
          ))}
        </ul>
      </div>
    </div>
  );
};
