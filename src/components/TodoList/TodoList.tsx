import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Array<Todo>;
  handleShowPostInfo: (todo: Todo) => void;
  setIsShownPostInfo: (todo: boolean) => void;
  isShownPostInfo: boolean;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleShowPostInfo,
  setIsShownPostInfo,
  isShownPostInfo,
}) => {
  const [currentTodoId, setCurrentTodoId] = useState<number>();

  function makeCurrentTodoId(idNumber: number): void {
    setCurrentTodoId(idNumber);
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span
                  className="icon"
                  onClick={() => {
                    handleShowPostInfo(todo);
                    setIsShownPostInfo(true);
                    makeCurrentTodoId(todo.id);
                  }}
                >
                  <i
                    className={`far ${isShownPostInfo && currentTodoId === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
