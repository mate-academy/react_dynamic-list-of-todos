import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  currentTodo: number;
  setCurrentTodo: (todo: number) => void;
  setHideTodoModal: (hide: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  currentTodo,
  setCurrentTodo,
  setHideTodoModal,
}) => {
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
          <tr data-cy="todo" key={todo.id} className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={`has-text-${todo.completed
                ? 'success'
                : 'danger'}`}
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
                  setHideTodoModal(true);
                  setCurrentTodo(todo.id);
                }}
              >
                <span className="icon">
                  <i className={`far fa-eye${todo.id === currentTodo ? '-slash' : ''}`} />
                </span>
              </button>

            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
};
