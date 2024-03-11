import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Porps = {
  posts: Todo[];
  modalInfo: Todo | null;
  setModal: (modal: Todo) => void;
};

export const TodoList: React.FC<Porps> = ({ posts, modalInfo, setModal }) => (
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
        <tr
          data-cy="todo"
          className={classNames({
            'has-background-info-light': modalInfo?.id === post.id,
          })}
          key={post.id}
        >
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
                post.completed ? 'has-text-success ' : 'has-text-danger',
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
              onClick={() => setModal(post)}
            >
              <span className="icon">
                <i
                  className={classNames(
                    'far',
                    modalInfo?.id === post.id ? 'fa-eye-slash' : 'fa-eye',
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
