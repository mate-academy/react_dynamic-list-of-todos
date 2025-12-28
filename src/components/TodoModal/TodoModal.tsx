import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  user: User | null;
  loading: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  loading,
  onClose,
}) => (
  <div className="modal is-active" data-cy="modal" style={{ display: 'block' }}>
    <div className="modal-background" onClick={onClose} />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title" data-cy="modal-header">
          Todo #{todo.id}
        </p>
        <button
          type="button"
          className="delete"
          onClick={onClose}
          data-cy="modal-close"
        />
      </header>
      <section className="modal-card-body">
        {loading ? (
          <Loader />
        ) : (
          <>
            <p className="title is-4" data-cy="modal-title">
              {todo.title}
            </p>
            {user && (
              <p data-cy="modal-user">
                <strong
                  className={cn({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            )}
          </>
        )}
      </section>
    </div>
  </div>
);
