import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setSelectedPost: (selectedPost: Todo) => void,
  selectedPost: Todo | null;
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    setSelectedPost,
    selectedPost,
  },

) => (
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
        const { id, title, completed } = todo;

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': selectedPost?.id === id,
            })}
            key={id}
          >
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={
                  !completed
                    ? 'has-text-danger'
                    : 'has-text-success'
                }
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setSelectedPost(todo)}
              >
                <span className="icon">
                  <i className={cn('far', {
                    'fa-eye': selectedPost?.id !== todo.id,
                    'fa-eye-slash': selectedPost
                      && selectedPost.id === todo.id,
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
;
