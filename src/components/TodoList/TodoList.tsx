import React, {
  ChangeEvent, Dispatch,
  SetStateAction, useState,
} from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  onUserSelect: Dispatch<SetStateAction<number>>,
  userId: number,
};

export const TodoList: React.FC<Props> = ({
  todos, onUserSelect, userId,
}) => {
  const [selectedTodo, setSelectedTodo] = useState(false);
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('');

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
  const getFilteredTodos = () => {
    switch (select) {
      case 'all':
        return filteredTodos;

      case 'active': {
        filteredTodos = todos.filter(todo => !todo.completed);

        return filteredTodos;
      }

      case 'completed': {
        filteredTodos = todos.filter(todo => todo.completed);

        return filteredTodos;
      }

      default:
        return filteredTodos;
    }
  };

  const newTodos = getFilteredTodos()
    .filter(todo => todo.title
      .toLowerCase()
      .includes(input.toLowerCase()));

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
                      && todo.userId === userId
                    ),
                  },
                )}
                type="button"
                onClick={() => {
                  setSelectedTodo(prev => !prev);
                  onUserSelect(todo.userId);
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
