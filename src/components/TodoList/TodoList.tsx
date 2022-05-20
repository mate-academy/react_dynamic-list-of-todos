import {
  Dispatch,
  FC,
  useState,
  useEffect,
} from 'react';

import './TodoList.scss';

interface Props {
  todos: Todo[];
  setSelectedUserId: Dispatch<number>,
}

export const TodoList: FC<Props> = ({
  todos,
  setSelectedUserId,
}) => {
  const [filterByTitle, setFilterByTitle] = useState<string>('');
  const [isComplete, setIsComplete] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      const titleLower = todo.title.toLowerCase();
      const toLowerCase = filterByTitle.toLowerCase();

      switch (isComplete) {
        case 'show all':
          return titleLower.includes(toLowerCase);

        case 'not completed':
          return titleLower.includes(toLowerCase) && todo.completed === false;

        case 'completed':
          return titleLower.includes(toLowerCase) && todo.completed === true;

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
          <input
            type="text"
            value={filterByTitle}
            onChange={({ target }) => {
              setFilterByTitle(target.value);
            }}
          />
        </label>

        <label>
          <select
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
