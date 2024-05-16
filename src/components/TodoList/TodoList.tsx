import React from 'react';
import {Todo} from "../../types/Todo";
import classNames from "classnames";

type Props = {
  todos: Todo[];
  onActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSetTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>;
  isModalActive: boolean;
  activeTodo: Todo | undefined;
};

export const TodoList: React.FC<Props> = ({
                                            todos,
                                            onActiveModal,
                                            onSetTodo,
                                            isModalActive,
                                            activeTodo
  }) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon">
            <i className="fas fa-check"/>
          </span>
        </th>
        <th>Title</th>
        <th></th>
      </tr>
      </thead>

      <tbody>
        {todos.map((todo) => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check"/>
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames({
                "has-text-danger": !todo.completed,
                "has-text-success": todo.completed,
              })}>{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onActiveModal(true);
                  onSetTodo(todo);
                }}
              >
                {isModalActive && activeTodo?.id === todo.id ? (
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                ) : (
                  <span className="icon">
                    <i className="far fa-eye"/>
                  </span>
                )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
