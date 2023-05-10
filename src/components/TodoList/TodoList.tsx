import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  todoModalId: number | null;
  onOpenModal: (todoId: number) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  todoModalId,
  onOpenModal,
}) => (
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
      {todos.map((todo) => {
        const isTodoModalOpen = todoModalId === todo.id;

        return (
          <tr key={todo.id} data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {
                todo.completed && (
                  <span
                    className="icon"
                    data-cy="iconCompleted"
                  >
                    <i className="fas fa-check" />
                  </span>
                )
              }
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames('block', {
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
                onClick={() => onOpenModal(todo.id)}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': !isTodoModalOpen,
                    'fa-eye-slash': isTodoModalOpen,
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
