import React, { useState, Dispatch, useEffect } from 'react';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  setSelectedUserId: Dispatch<number>,
}

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedUserId,
}) => {
  const [isComplete, setIsComplete] = useState('show all');
  const [filterByTitle, setFilterByTitle] = useState<string>('');
  const [visibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      const titleToLower = todo.title.toLowerCase();
      const filterByTitleToLower = filterByTitle.toLowerCase();

      switch (isComplete) {
        case 'show all':
          return titleToLower.includes(filterByTitleToLower);

        case 'not completed':
          return titleToLower.includes(filterByTitleToLower)
          && todo.completed === false;

        case 'completed':
          return titleToLower.includes(filterByTitleToLower)
          && todo.completed === true;

        default:
          return todo;
      }
    }));
  }, [filterByTitle, isComplete, todos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__sort">
        <label>
          Sort by title:
          <input
            type="text"
            className="TodoList__input"
            value={filterByTitle}
            onChange={({ target }) => {
              setFilterByTitle(target.value);
            }}
          />
        </label>

        <label>
          Sort by status:
          <select
            name="isCompleted"
            className="TodoList__input"
            onChange={({ target }) => {
              setIsComplete(target.value);
            }}
          >
            <option value="show all">Show all</option>
            <option value="not completed">Not completed</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <div className="TodoList__list">
        {visibleTodos.map(todo => {
          return (
            <li
              key={todo.id}
              className={`TodoList__item
                TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`}
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
                type="button"
                className="TodoList__user-button"
                onClick={() => setSelectedUserId(todo.userId)}
              >
                {`User: ${todo.userId}`}
              </button>
            </li>
          );
        })}
      </div>
    </div>
  );
};
