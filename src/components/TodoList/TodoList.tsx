import React, { useState, useEffect } from 'react';
import './TodoList.scss';
import classnames from 'classnames';
import { getTodos } from '../../api';

type Props = {
  addUserId: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  addUserId,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [option, setOption] = useState('all');

  useEffect(() => {
    getTodos().then(allTodos => setTodos(allTodos));
  }, []);

  const handleOptions = (filterOption: string, todo: Todo) => {
    switch (filterOption) {
      case 'active':
        return todo.completed === false;
      case 'completed':
        return todo.completed === true;
      default:
        return true;
    }
  };

  const filteredTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(input.toLowerCase())
    && handleOptions(option, todo));

  const randomizer = () => {
    const copyOfTodos = [...todos];

    for (let i = copyOfTodos.length - 1; i >= 0; i--) {
      const rev = Math.floor(Math.random() * (i + 1));

      [copyOfTodos[i], copyOfTodos[rev]] = [copyOfTodos[rev], copyOfTodos[i]];
    }

    setTodos(copyOfTodos);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <input
          type="text"
          data-cy="filterByTitle"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <select
          value={option}
          onChange={(event) => {
            setOption(event.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button
          type="button"
          onClick={randomizer}
        >
          Randomize
        </button>
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filteredTodos.map(todo => (
            <li
              className={classnames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
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
                onClick={() => {
                  addUserId(todo.userId);
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
