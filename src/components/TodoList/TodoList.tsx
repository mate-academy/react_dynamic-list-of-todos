import React from 'react';
import './TodoList.scss';

type Props = {
  userSelected: (userId: number, id: number) => void;
  filterTodosList: (searchQuery: string) => void,
  filterTodosByStatus: (status: string) => void,
  randomizeTodosList: () => void,
  displayedTodos: Todo[];
  currentTodoId: number,
};

export const TodoList: React.FC<Props>
  = ({
    userSelected,
    filterTodosList,
    filterTodosByStatus,
    randomizeTodosList,
    displayedTodos,
    currentTodoId,
  }) => (
    <div className="TodoList">
      <h2>Todos:</h2>

      <label
        className="Search"
      >
        Search todo
        <input
          className="Search__field"
          onChange={
            (event) => filterTodosList(event.target.value)
          }
        />
      </label>

      <select
        className="StatusSelection"
        defaultValue="all"
        onChange={(event) => filterTodosByStatus(event.target.value)}
      >
        <option
          value="all"
        >
          Show all todos
        </option>
        <option
          value="active"
        >
          Show active todos
        </option>
        <option
          value="completed"
        >
          Show completed todos
        </option>
      </select>

      <button
        className="Randomize"
        type="button"
        onClick={randomizeTodosList}
      >
        Randomize
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {displayedTodos.map(todo => (
            <li
              className={
                todo.completed
                  ? 'TodoList__item TodoList__item--checked'
                  : 'TodoList__item TodoList__item--unchecked'
              }
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p
                  className={
                    (todo.id === currentTodoId) ? 'Selected' : ''
                  }
                >
                  {todo.title}
                </p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => {
                  userSelected(todo.userId, todo.id);
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
