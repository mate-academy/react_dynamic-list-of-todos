import React, { useState } from 'react';
import { TodoType } from '../../types/TodoType';
import './TodoList.scss';

interface Props {
  todoList: TodoType[],
  setId: (id: number) => void
}

enum ShowType {
  All = 'all',
  Completed = 'completed',
  Uncompleted = 'uncompleted',
}

export const TodoList: React.FC<Props> = ({ todoList, setId }) => {
  const [query, setQuery] = useState<string>('');

  const [showBy, setShowBy] = useState<string>(ShowType.All);

  const visibleTodos
    = todoList
      .filter(todo => {
        return todo.title.toLowerCase()
          .includes(query.toLowerCase());
      });

  const result = () => {
    switch (showBy) {
      case ShowType.All:
        return [...visibleTodos];
      case ShowType.Completed:
        return visibleTodos.filter(todo => todo.completed);
      case ShowType.Uncompleted:
        return visibleTodos.filter(todo => !todo.completed);
      default:
        return [...visibleTodos];
    }
  };

  return (
    <div className="TodoList">
      Filter
      <input
        type="text"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
      <br />
      <select
        name="showby"
        value={showBy}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setShowBy(event.target.value);
        }}
      >
        <option value={ShowType.All}>{ShowType.All}</option>
        <option value={ShowType.Completed}>{ShowType.Completed}</option>
        <option value={ShowType.Uncompleted}>{ShowType.Uncompleted}</option>
      </select>
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {result().map(todo => (
            <li
              key={todo.id}
              className="TodoList__item TodoList__item--unchecked"
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
                onClick={() => setId(Number(todo.userId))}
              >
                Select user
                {' '}
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
