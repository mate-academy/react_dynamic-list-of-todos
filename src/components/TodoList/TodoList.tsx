import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  renderedData: Todo[];
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  setClickedTodoId: (value: number) => void;
  clickedTodoId: number | null;
  setUserTodo: (value: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  renderedData,
  isOpenModal,
  setIsOpenModal,
  setClickedTodoId,
  clickedTodoId,
  setUserTodo,
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
        {renderedData.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>

            <td className="is-vcentered">
              {todo.completed ? (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              ) : null}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span
                  className="icon"
                  onClick={() => {
                    setIsOpenModal(true);
                    setClickedTodoId(todo.id);
                    setUserTodo(todo);
                  }}
                >
                  {isOpenModal && todo.id === clickedTodoId ? (
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
