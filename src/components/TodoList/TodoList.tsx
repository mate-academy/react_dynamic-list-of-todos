import React, { useState, useCallback } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todoList: Todo[];
  onEyeClick: (todoId: number, userId: number) => void;
  isModalOpen: boolean;
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todoList, onEyeClick, isModalOpen }) => {
    const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

    const handleEyeClick = useCallback(
      (todoId: number, userId: number) => {
        setSelectedTodoId(prevSelectedTodoId =>
          prevSelectedTodoId === todoId ? null : todoId,
        );
        onEyeClick(todoId, userId);
      },
      [onEyeClick],
    );

    TodoList.displayName = 'TodoList';

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

        {todoList.map(todo => (
          <tbody key={todo.id}>
            <tr data-cy="todo" className="">
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
                  className={classNames({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleEyeClick(todo.id, todo.userId)}
                >
                  <span className="icon">
                    <i
                      className={`far ${selectedTodoId === todo.id && isModalOpen ? 'fa-eye-slash' : 'fa-eye'}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    );
  },
);
