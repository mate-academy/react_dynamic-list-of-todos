import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  setSelectedId: (id: number) => void;
  filterType: string;
  handleChangeSelect: (type: string) => void;
  showTodoList: (list: Todo[], type: string) => Todo[];
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedId,
  filterType,
  handleChangeSelect,
  showTodoList,
}) => {
  const displayTypes = ['all', 'active', 'completed'];

  const prepearedTodos = showTodoList(todos, filterType);

  return (
    <div className="TodoList">
      <label htmlFor="select">
        Choose type of todos
        <select
          className="TodoList__select"
          name="todos"
          id="select"
          onChange={(event) => handleChangeSelect(event.target.value)}
        >
          <option key={0} value={0}>
            Choose type
          </option>
          {displayTypes.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {prepearedTodos.map((todo) => {
            return (
              <li
                key={todo.title + todo.id}
                className={
                  todo.completed
                    ? 'TodoList__item TodoList__item--checked'
                    : 'TodoList__item TodoList__item--unchecked'
                }
              >
                <label htmlFor="check">
                  <input
                    type="checkbox"
                    id="check"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
              TodoList__user-button
              TodoList__user-button--selected
              button"
                  type="button"
                  onClick={() => {
                    setSelectedId(todo.userId);
                  }}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
