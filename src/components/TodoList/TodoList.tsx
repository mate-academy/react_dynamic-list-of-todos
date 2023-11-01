import React, { } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setIsVisibleModal: (value: boolean) => void;
  setUserId: (value: number) => void;
  setPost: (value: Todo) => void;
  setButtonId: (value: number) => void;
  buttonId: number,
};

interface HandleClick {
  boolean: boolean;
  id: number;
  userId: number;
  todo: Todo;
}

export const TodoList: React.FC<Props> = ({
  todos,
  setIsVisibleModal,
  setUserId,
  setPost,
  setButtonId,
  buttonId,
}) => {
  function handleClick(values: HandleClick) {
    const {
      id,
      boolean,
      userId,
      todo,
    } = values;

    setIsVisibleModal(boolean);
    setButtonId(id);
    setUserId(userId);
    setPost(todo);
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

        {todos.map(todo => {
          const {
            id,
            title,
            completed,
            userId,
          } = todo;

          return (
            <tr
              key={id}
              data-cy="todo"
              className=""
            >
              <td className="is-vcentered">
                {id}
              </td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={completed ? 'has-text-success' : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {buttonId === id ? (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i
                        className="far fa-eye-slash"
                      />
                    </span>
                  </button>
                ) : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      // setIsVisibleModal(true);
                      // setButtonId(id);
                      // setUserId(userId);
                      // setPost(todo);
                      handleClick({
                        boolean: true, id, userId, todo,
                      });
                    }}
                  >
                    <span className="icon">
                      <i
                        className="far fa-eye"
                      />
                    </span>
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
