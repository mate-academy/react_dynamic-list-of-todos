import React, {
  useState,
  useEffect,
} from 'react';
import './TodoList.scss';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  setSelectedUserId: (userId: number) => void,
}

enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoList: React.FC<Props> = ({ todos, setSelectedUserId }) => {
  const [isFiltered, setIsFiltered] = useState('');
  const [isCompleted, setIsCompleted] = useState(Status.All);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      const titleToLower = todo.title.toLowerCase().includes(isFiltered);

      switch (isCompleted) {
        case Status.All:
          return titleToLower;

        case Status.Active:
          return titleToLower && !todo.completed;

        case Status.Completed:
          return titleToLower && todo.completed;

        default:
          return todo;
      }
    }));
  }, [isFiltered, isCompleted, todos]);

  // console.log(isCompleted);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__sort">
        <label>
          Title:
          <input
            className="TodoList__input"
            type="text"
            value={isFiltered}
            onChange={({ target }) => {
              setIsFiltered(target.value);
            }}
          />
        </label>

        <label>
          <select
            className="TodoList__input"
            name="isCompleted"
            onChange={({ target }) => {
              setIsCompleted(target.value as Status);
            }}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </label>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(item => {
            return (
              <li
                key={item.id}
                className={`TodoList__item
                  TodoList__item--${item.completed ? 'checked' : 'unchecked'}`}
              >
                <label>
                  <input
                    checked={item.completed}
                    type="checkbox"
                    readOnly
                  />
                  <p>{item.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => setSelectedUserId(item.userId)}
                >
                  User&nbsp;#
                  {item.userId}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
