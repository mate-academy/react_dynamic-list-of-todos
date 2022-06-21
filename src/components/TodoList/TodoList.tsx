import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { getTodos } from '../../api';
import './TodoList.scss';

type Props = {
  selectUser: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({ selectUser }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodosFromServer = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const [query, setQuery] = useState('');

  const [completedTodos, setCompletedTodos] = useState('all');

  // const filteredTitleTodos = (insert: string | ''): Todo[] => {
  //   return todos.filter(
  //     todo => todo.title.includes(insert.toLowerCase()),
  //   );
  // };

  const filteredTitleTodos = todos.filter(todo => todo.title.includes(query));

  const filteredCompletedTodos = (allTodos: Todo[]) => {
    switch (completedTodos) {
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

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        placeholder="Enter title"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <select
        value={completedTodos}
        onChange={(event) => setCompletedTodos(event.target.value)}
      >
        <option
          value="all"
        >
          all
        </option>
        <option
          value="active"
        >
          active
        </option>
        <option
          value="completed"
        >
          completed
        </option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredCompletedTodos(filteredTitleTodos).map(todo => (
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
                onClick={() => {
                  selectUser(todo.userId);
                }}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}

          {/* <li className="TodoList__item TodoList__item--unchecked">
            <label>
              <input type="checkbox" readOnly />
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
          </li> */}

          {/* <li className="TodoList__item TodoList__item--checked">
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
          </li> */}
        </ul>
      </div>
    </div>
  );
};
