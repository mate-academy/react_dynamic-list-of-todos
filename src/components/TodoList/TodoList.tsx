import React from 'react';
import { TodoListProps } from '../../types/TodoList';
import cn from 'classnames';

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleClick,
  filterPost,
  selectedPost,
}) => {
  const filteredPosts = filterPost(todos);

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
        {filteredPosts.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={cn({
              '': selectedPost?.id !== todo.id,
              'has-background-info-light': selectedPost?.id === todo.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            {!todo.completed ? (
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
                className={cn({
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
                onClick={() => handleClick(todo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye': selectedPost?.id !== todo.id,
                      'fa-eye-slash': selectedPost?.id === todo.id,
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
