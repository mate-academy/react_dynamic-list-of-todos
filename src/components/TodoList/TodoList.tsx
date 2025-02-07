import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  openModal: () => void;
  getUserId: (userId: number) => void;
  getTodoId: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  openModal,
  getUserId,
  getTodoId,
}) => {
  const [id, setId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (selectedTodo) {
      setId(selectedTodo.id);
    } else {
      setId(undefined);
    }
  }, [selectedTodo]);

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
          <tr key={todo.id} data-cy="todo" className="">
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
                  openModal();
                  getTodoId(todo);
                  getUserId(todo.userId);
                }}
              >
                <span className="icon">
                  {todo.id === id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
