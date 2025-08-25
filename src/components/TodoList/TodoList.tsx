import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  currentTodo: Todo | null;
  isModal: boolean;
  handleIsModal: () => void;
  handleCurrenTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  currentTodo,
  isModal,
  handleIsModal,
  handleCurrenTodo,
}) => {
  const handleClick = (todo: Todo) => {
    handleIsModal();
    handleCurrenTodo(todo);
  };

  let currentTodoId = null;

  if (todos.length === 0) {
    return <p data-cy="no-todos-message">No todos found</p>;
  }

  if (currentTodo) {
    currentTodoId = currentTodo.id;
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
        {todos.map((todo: Todo) => {
          return (
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
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    handleClick(todo);
                  }}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye-slash': currentTodoId === todo.id && isModal,
                        'fa-eye': !(currentTodoId === todo.id && isModal),
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
