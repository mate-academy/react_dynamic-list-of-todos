import React, { useState, useEffect, useMemo } from 'react';
import './TodoList.scss';
import { getTodos } from '../../api/api';
import { Todo } from '../../react-app-env';

type Props = {
  selectedUserId: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({ selectedUserId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectBy, setSelectBy] = useState('all');

  useEffect(() => {
    getTodos()
      .then(todosPrepare => setTodos(todosPrepare));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
  }, [todos, query]);

  const selectTodos = () => {
    switch (selectBy) {
      case 'all':
        return visibleTodos;

      case 'active':
        return visibleTodos.filter(todo => !todo.completed);

      case 'completed':
        return visibleTodos.filter(todo => todo.completed);

      default:
        return visibleTodos;
    }
  };

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
          setSelectBy(event.target.value);
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
        TodoList__user-button--selected
        button
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
          {selectTodos().map(todo => (
            <li
              className="TodoList__item TodoList__item--unchecked"
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
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
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
