import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import { Todo } from '../../react-app-env';
import { getAllTodos } from '../../api';

interface Props {
  selectedUserId: number,
  chahgeSelectedUserId: (id: number) => void,
}

enum Options {
  all,
  active,
  completed,
}

export const TodoList: React.FC<Props> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<Options>(Options.all);

  useEffect(() => {
    getAllTodos()
      .then(response => setTodos(response))
      .catch((error) => {
        alert(`${error}`);
      });
  }, []);

  const handleOptions = (filterOption: Options, todo: Todo) => {
    switch (filterOption) {
      case Options.active:
        return todo.completed === false;
      case Options.completed:
        return todo.completed === true;
      default:
        return true;
    }
  };

  const filteredTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(input.toLowerCase())
    && handleOptions(status, todo));

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">

        <input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />

        <select
          value={status}
          onChange={(event) => {
            setStatus(+event.target.value);
          }}
        >
          <option value={Options.all}>All</option>
          <option value={Options.active}>Active</option>
          <option value={Options.completed}>Completed</option>
        </select>

        <ul className="TodoList__list">
          {
            filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={`
              TodoList__item
              ${todo.completed ? 'TodoList__item--checked' : 'TodoList__item--unchecked'}`}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{ todo.title }</p>
                </label>

                <button
                  onClick={() => props.chahgeSelectedUserId(todo.userId)}
                  className={`
                  button
                    ${props.selectedUserId === todo.userId ? 'TodoList__user-button--selected' : 'TodoList__user-button'}
                  `}
                  type="button"
                >
                  User#
                  {todo.userId}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
