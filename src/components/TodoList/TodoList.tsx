import React from 'react';
import { TodoListProps } from '../../types/TodoList';
import cn from 'classnames';

export const TodoList: React.FC<TodoListProps> = ({
  todo,
  loading,
  setPost,
  filterPost,
  selectedPost,
}) => {
  const filteredPosts = filterPost(todo);

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
        {filteredPosts.map(todos => (
          <tr
            key={todos.id}
            data-cy="todo"
            className={cn({
              '': selectedPost?.id !== todos.id,
              'has-background-info-light': selectedPost?.id === todos.id,
            })}
          >
            <td className="is-vcentered">{todos.id}</td>
            {todos.completed === false ? (
              <td className="is-vcentered" />
            ) : (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            )}

            <td className="is-vcentered is-expanded">
              <p
                className={
                  todos.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todos.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  loading(true);
                  setPost(todos);
                }}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye': selectedPost?.id !== todos.id,
                      'fa-eye-slash': selectedPost?.id === todos.id,
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
};
