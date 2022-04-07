import React, { useEffect, useState } from 'react';
import './TodoList.scss';

type Props = {
  selectedUserId: (uId: number) => void
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ selectedUserId, todos }) => {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('all');
  const [todosList, setTodosList] = useState<Todo[]>([]);

  useEffect(() => {
    setTodosList(todos.filter(todo => {
      switch (selectedOption) {
        case 'all':
          return todo;
        case 'completed':
          return !todo.completed;
        case 'active':
          return todo.completed;
        default:
          return todo;
      }
    }));
  }, [selectedOption, todos, query]);

  const visibleTodos
    = todosList.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  const randomize = () => {
    const list = visibleTodos;

    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const k = list[i];

      list[i] = list[j];
      list[j] = k;
    }

    // eslint-disable-next-line
    // console.log(list);

    setTodosList(list);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          placeholder="title"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
        >
          <option>all</option>
          <option>active</option>
          <option>completed</option>
        </select>

        <button
          type="button"
          onClick={randomize}
          className="
          TodoList__user-button
          TodoList__user-button--selected
          button
        "
        >
          Random
        </button>

        <ul className="TodoList__list">
          {visibleTodos.map(user => (
            user.completed ? (
              <li key={user.id} className="TodoList__item TodoList__item--unchecked">
                <label htmlFor={`${user.id}`}>
                  <input id={`${user.id}`} type="checkbox" readOnly />
                  <p>{user.title}</p>
                </label>

                <button
                  className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                  type="button"
                  onClick={() => selectedUserId(user.userId)}
                >
                  User&nbsp;
                  {user.userId}
                </button>
              </li>
            ) : (
              <li key={user.id} className="TodoList__item TodoList__item--checked">
                <label htmlFor={`${user.id}`}>
                  <input id={`${user.id}`} type="checkbox" checked readOnly />
                  <p>{user.title}</p>
                </label>

                <button
                  className="TodoList__user-button button"
                  onClick={() => selectedUserId(user.userId)}
                  type="button"
                >
                  User&nbsp;
                  {user.userId}
                </button>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};
