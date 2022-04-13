import React, {
  Dispatch, memo, SetStateAction, useContext, useEffect, useMemo,
} from 'react';

import './TodoList.scss';

import { TodosContext, TodoStatus } from '../../TodosContext';

interface Props {
  selectedUserId: number,
  setSelectedUserId: Dispatch<SetStateAction<number>>,
}

export const TodoList: React.FC<Props> = memo(({
  selectedUserId,
  setSelectedUserId,
}) => {
  const {
    todos,
    todoStatus,
    setTodoStatus,
    todoTitle,
    setTodoTitle,
  } = useContext(TodosContext);

  const handleChange = (event: React.ChangeEvent<
  HTMLFormElement
  | HTMLSelectElement
  | HTMLInputElement
  >) => {
    const { value, name } = event.target;

    switch (name) {
      case 'todos-status-selector':
        setTodoStatus(value);
        break;

      case 'todos-title-input':
        setTodoTitle(value);
        break;

      default:
        break;
    }
  };

  const prepareTodos = (preparedTodos: Todo[]) => (
    preparedTodos.filter(todo => {
      const lowerTodoTitle = todo.title.toLowerCase();
      const lowerSearchWords = todoTitle.toLowerCase();

      const getStatus = (status: TodoStatus) => {
        switch (status) {
          case TodoStatus.active:
            return todo.completed === false;
          case TodoStatus.completed:
            return todo.completed === true;
          default:
            return true;
        }
      };

      return lowerTodoTitle.includes(lowerSearchWords)
        && getStatus(todoStatus);
    })
  );

  const visibleTodos = useMemo(() => prepareTodos(todos),
    [todoTitle, todoStatus, todos]);

  useEffect(() => {
  }, [todoTitle, todoStatus]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <form className="TodoList__form form">
          <input
            type="text"
            id="todos-title-input"
            name="todos-title-input"
            className="form__title-input"
            value={todoTitle}
            onChange={handleChange}
          />

          <select
            id="todos-status-selector"
            name="todos-status-selector"
            className="form__status-selector"
            value={todoStatus}
            onChange={handleChange}
          >
            {Object.keys(TodoStatus).map(option => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </form>

        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              className={`TodoList__item TodoList__item--${
                todo.completed
                  ? 'checked'
                  : 'unchecked'
              }`}
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
                className={
                  'TodoList__user-button button '
                  + `TodoList__user-button--${
                    todo.userId === selectedUserId && 'selected'
                  }`
                }
                type="button"
                onClick={() => setSelectedUserId(todo.userId)}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
