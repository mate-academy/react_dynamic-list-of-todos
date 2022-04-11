/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/indent */
import React, { ChangeEvent, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  onUserSelect: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({ todos, onUserSelect }) => {
  const [selectedTodo, setSelectedTodo] = useState(false);
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('');
  const [userId, setUserId] = useState<string | null>();

  // Get a new array to map, depending on Input Title
  let filteredTodos = todos
    .filter(todo => todo.title
      .toLowerCase()
      .includes(input.toLowerCase()));

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;

    setInput(val);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    const val = e.target.value;

    setSelect(val);
  };

  // Filtered Array of Todos depending on Input & Select Option
  const filterTodos = () => {
    switch (select) {
      case 'all':
        return filteredTodos;

      case 'active': {
        filteredTodos = todos.filter(todo => todo.completed === false);

        const activeTodos = filteredTodos
          .filter(todo => todo.title
          .toLowerCase()
          .includes(input.toLowerCase()));

        return activeTodos;
      }

      case 'completed': {
        filteredTodos = todos.filter(todo => todo.completed === true);

        const completedTodos = filteredTodos
          .filter(todo => todo.title
          .toLowerCase()
          .includes(input.toLowerCase()));

        return completedTodos;
      }

      default:
        return filteredTodos;
    }
  };

  const newTodos = filterTodos();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <label htmlFor="title">Title: </label>
      <input
        id="title"
        value={input}
        onChange={handleChange}
      />

      <select onChange={(e) => handleSelect(e)}>
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {newTodos.map(todo => (

            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--checked': todo.completed === true,
                  'TodoList__item--unchecked':
                    todo.completed === false,
                },
              )}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button button',
                  {
                    'TodoList__user-button--selected': (
                      selectedTodo === true
                      && (todo.userId.toString()) === userId
                    ),
                  },
                )}
                type="button"
                onClick={(e) => {
                  setSelectedTodo(prev => !prev);
                  onUserSelect(todo.userId);

                  const id = e.currentTarget.textContent?.slice(-1);

                  setUserId(id);

                  // eslint-disable-next-line no-console
                  console.log(id?.slice(-1), todo.userId);
                }}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
