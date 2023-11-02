import React, { } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setIsVisibleModal: (value: boolean) => void;
  setUserId: (id: number) => void;
  setPost: (post: Todo) => void;
  selectedPostId: number;
};

interface HandleClick {
  boolean: boolean;
  userId: number;
  todo: Todo;
}

export const TodoList: React.FC<Props> = ({
  todos,
  setIsVisibleModal,
  setUserId,
  setPost,
  selectedPostId,
}) => {
  function handleClick(values: HandleClick) {
    const {
      boolean,
      userId,
      todo,
    } = values;

    setIsVisibleModal(boolean);
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
              className={cn({
                'has-background-info-light': selectedPostId === id,
              })}
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
                  className={cn({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleClick({ boolean: true, userId, todo })}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye': selectedPostId !== id,
                        'fa-eye-slash': selectedPostId === id,
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
