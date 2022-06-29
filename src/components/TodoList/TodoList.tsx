import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api\'s/api';
import './TodoList.scss';

type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

type HandleSetSelectedUserId = (id: number) => void;

interface Props {
  handleSetSelectedUserId: HandleSetSelectedUserId;
}

export const TodoList: React.FC<Props> = ({ handleSetSelectedUserId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [todosCategory, setTodosCategory] = useState('all');

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
    });
  }, []);

  function prepareTodos() {
    switch (todosCategory) {
      case 'active':
        return todos.filter(({ title, completed }) => {
          return title.toLowerCase().includes(query.toLowerCase())
            && completed === false;
        });
      case 'completed':
        return todos.filter(({ title, completed }) => {
          return title.toLowerCase().includes(query.toLowerCase()) && completed;
        });
      default:
        return todos.filter(({ title }) => {
          return title.toLowerCase().includes(query.toLowerCase());
        });
    }
  }

  const visibleTodos = prepareTodos();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        placeholder="filter"
        className="input is-primary"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />

      <br />
      <br />

      <div className="select is-primary">
        <select
          value={todosCategory}
          onChange={(event) => {
            setTodosCategory(event.target.value);
          }}
        >
          <option value="all">All todos</option>
          <option value="active">Active todos</option>
          <option value="completed">Completed todos</option>
        </select>
      </div>

      <br />
      <br />

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(({ id, title, userId }) => (
            <li className="TodoList__item TodoList__item--unchecked" key={id}>
              <label>
                <input type="checkbox" readOnly />
                <p>{title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => {
                  handleSetSelectedUserId(userId);
                }}
              >
                User&nbsp;#
                {userId}
              </button>
            </li>
          ))}

          <li className="TodoList__item TodoList__item--checked">
            <label>
              <input type="checkbox" checked readOnly />
              <p>distinctio vitae autem nihil ut molestias quo</p>
            </label>

            <button
              className="TodoList__user-button button"
              type="button"
            >
              User&nbsp;#2
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
