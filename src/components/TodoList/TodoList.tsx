import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[],
  handleClickModalButton: (todo: Todo) => void,
  isModalOpen: boolean,
  personalTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  visibleTodos, handleClickModalButton, isModalOpen, personalTodo,
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
      {visibleTodos.map(todo => {
        return (
          <tr
            data-cy="todo"
            className=""
            key={todo.id}
          >
            <td
              className="is-vcentered"
            >
              {todo.id}
            </td>

            {todo.completed
              ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              )
              : <td className="is-vcentered" />}

            <td className="is-vcentered is-expanded">
              <p className={todo.completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleClickModalButton(todo)}
              >
                <span className="icon">
                  <i className={isModalOpen && personalTodo === todo
                    ? 'far fa-eye-slash'
                    : 'far fa-eye'}
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
