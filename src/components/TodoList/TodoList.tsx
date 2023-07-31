import React, { memo } from "react";
import classNames from "classnames";
import { Todo } from "../../types/Todo";

type Props = {
  todos: Todo[];
  toggleModal: () => void;
  updateTodo: (todo: Todo) => void;
  getUserById: (userId: number) => void;
  isModalOpen: boolean;
};

export const TodoList: React.FC<Props> = memo(
  ({ todos, toggleModal, updateTodo, getUserById, isModalOpen }) => {
    function handleClick(todo: Todo, userId: number) {
      toggleModal();
      updateTodo(todo);
      getUserById(userId);
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
          {todos.map((todo) => (
            <tr
              data-cy="todo"
              className={classNames({
                "has-background-info-light": isModalOpen,
                "": !isModalOpen,
              })}
              key={todo.id}
            >
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
                    "has-text-danger": !todo.completed,
                    "has-text-success": todo.completed,
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
                  onClick={() => handleClick(todo, todo.userId)}
                >
                  <span className="icon">
                    <i
                      className={classNames({
                        "far fa-eye": !isModalOpen,
                        "far fa-eye-slash": isModalOpen,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);
