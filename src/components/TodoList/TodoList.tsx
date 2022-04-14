import { FC, useMemo, useState } from 'react';
import './TodoList.scss';
import { Todo } from '../../interfaces';

interface Props {
  todos: Todo[];
  getId: (number: number) => void;
  userId: number;
}

export const TodoList: FC<Props> = ({ todos, getId, userId }) => {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const filteredTodos = useMemo(() => (
    todos.filter(todo => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    })
      .filter(todo => {
        switch (selectedOption) {
          case 'All':
            return todo;
          case 'Active':
            return !todo.completed;
          case 'Completed':
            return todo.completed;
          default:
            return todo;
        }
      })
  ), [query, todos, selectedOption]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <select
        defaultValue={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
      >
        <option selected value="All">All</option>
        <option value="Active">
          Active
        </option>
        <option value="Completed">Completed</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <li
              className={
                `TodoList__item
                ${todo.completed
              ? 'TodoList__item--checked'
              : 'TodoList__item--unchecked'}`
              }
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={`
                  button
                  TodoList__user-button
                  ${userId === todo.userId
                    && 'TodoList__user-button--selected'}}
                `}
                type="button"
                onClick={() => {
                  getId(todo.userId);
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
