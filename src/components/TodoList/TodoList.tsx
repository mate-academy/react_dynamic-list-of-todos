import { Dispatch, useEffect, useState } from 'react';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  setSelectedUserId: Dispatch<number>;
}

export const TodoList: React.FC<Props> = ({ todos, setSelectedUserId }) => {
  const [filterByTitle, setFilterByTitle] = useState<string>('');
  const [isComplete, setIsComplete] = useState('show all');
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const filterTodosByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByTitle(event.target.value);
  };

  const changeStatusOfTodo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsComplete(event.target.value);
  };

  const preparingTodos = () => {
    const todosFilteredByTitle = todos.filter(({ title }) => {
      const titleInLowerCase = title.toLowerCase();

      return titleInLowerCase.includes(filterByTitle.toLowerCase());
    });

    switch (isComplete) {
      case 'not completed':
        return todosFilteredByTitle.filter(
          ({ completed }) => !completed,
        );

      case 'completed':
        return todosFilteredByTitle.filter(
          ({ completed }) => completed,
        );

      default:
        return todosFilteredByTitle;
    }
  };

  const preparedTodos = preparingTodos();

  useEffect(() => {
    setVisibleTodos(preparedTodos);
  }, [filterByTitle, isComplete, todos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__sort">
        <label className="TodoList__label">
          Sort by title:
          <input
            className="TodoList__input"
            type="text"
            value={filterByTitle}
            onChange={filterTodosByTitle}
            data-cy="filterByTitle"
          />
        </label>

        <label className="TodoList__label">
          Sort by status:
          <select
            className="TodoList__input"
            name="isCompleted"
            value={isComplete}
            onChange={changeStatusOfTodo}
          >
            <option value="show all">Show all</option>

            <option value="not completed">Not completed</option>

            <option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map((item) => {
            return (
              <li
                key={item.id}
                className={`TodoList__item
                  TodoList__item--${item.completed ? 'checked' : 'unchecked'}`}
              >
                <label>
                  <input checked={item.completed} type="checkbox" readOnly />
                  <p>{item.title}</p>
                </label>

                {item.userId && (
                  <button
                    className="
                    TodoList__user-button
                    button"
                    type="button"
                    onClick={() => setSelectedUserId(item.userId)}
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
