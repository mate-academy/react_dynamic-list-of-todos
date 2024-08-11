import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  posts: Todo[];
  postId?: number;
  setSelectedPost: (postTodo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  posts,
  postId,
  setSelectedPost: setSelectPost = () => {},
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
      {posts.map(post => (
        <tr data-cy="todo" key={post.id}>
          <td className="is-vcentered">{post.id}</td>
          <td className="is-vcentered">
            {post.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={classNames(
                !post.completed ? 'has-text-danger' : 'has-text-success',
              )}
            >
              {post.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => setSelectPost(post)}
            >
              <span className="icon">
                <i
                  className={classNames(
                    post.id !== postId ? 'far fa-eye' : 'far fa-eye-slash',
                  )}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
