import React, { useState, useMemo } from 'react';
import './TodoList.scss';

interface Props {
  todos: Todo[]
  setSelectedId: (userId: number) => void;
}

export const TodoList: React.FC<Props> = ({
  todos, setSelectedId,
}) => {
  const [query, setQuery] = useState('');
  const [serchedtodo, setSerchedTodo] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState('all');

  useMemo(() => setSerchedTodo(todos
    .filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ))
    .filter(todo => {
      if (selectedOption === 'active') {
        return !todo.completed;
      }

      if (selectedOption === 'completed') {
        return todo.completed;
      }

      return true;
    })), [selectedOption, query, todos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
        id="search-query"
        className="TodoList_input"
        placeholder="Write the Title"
      />
      <select
        onChange={event => setSelectedOption(event.target.value)}
        className="TodoList_section"
      >
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {serchedtodo.map(todo => (
            <li
              className={`TodoList__item ${todo.completed ? 'TodoList__item--checked' : 'TodoList__item--unchecked'}`}
              key={todo.id}
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>
              <button
                onClick={() => setSelectedId(todo.userId)}
                className="TodoList__user-button button"
                type="button"
              >
                User&nbsp;
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
