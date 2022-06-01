import {
  Dispatch, FC, useState, useEffect,
} from 'react';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  setUserId: Dispatch<number>,
}

export const TodoList: FC<Props> = ({
  todos,
  setUserId,
}) => {
  const [isComplete, setIsComplete] = useState('show all');
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [filterByTitle, setFilterByTitle] = useState<string>('');

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      const filterByToLower = filterByTitle.toLowerCase();
      const titleToLower = todo.title.toLowerCase().includes(filterByToLower);

      switch (isComplete) {
        case 'show all':
          return titleToLower;

        case 'not completed':
          return titleToLower
            && !todo.completed;

        case 'completed':
          return titleToLower
            && todo.completed;

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
            className="TodoList__input"
            type="text"
            value={filterByTitle}
            onChange={(event) => {
              setFilterByTitle(event.target.value);
            }}
          />
        </label>

        <label>
          Sort by status:
          <select
            className="TodoList__input"
            name="isCompleted"
            onChange={({ target }) => {
              setIsComplete(target.value);
            }}
          >
            <option value="show all">
              Show all
            </option>

            <option value="not completed">
              Not completed
            </option>

            <option value="completed">
              Completed
            </option>
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

                {item.userId && (
                  <button
                    className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                    type="button"
                    onClick={() => setUserId(item.userId)}
                  >
                    User&nbsp;#
                    {item.userId}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
