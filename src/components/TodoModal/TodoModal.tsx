import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getPosts } from '../../getPosts';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  setTodo: (par: Todo) => void;
  isLoading: boolean;
  setIsLoading: (par: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  setTodo,
  isLoading,
  setIsLoading,
}) => {
  const [post, setPost] = useState<User>({} as User);

  const {
    userId,
    id,
    title,
    completed,
  } = todo;

  useEffect(() => {
    getPosts(userId)
      .then(data => setPost(data))
      .finally(() => setIsLoading(false));
  }, [post]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setTodo({} as Todo)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={cn({
                'has-text-danger': !completed,
                'has-text-success': completed,
              })}
              >
                { completed ? 'Done' : 'Planned' }
              </strong>

              {' by '}

              <a href={`mailto:${post.email}`}>
                {post.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
