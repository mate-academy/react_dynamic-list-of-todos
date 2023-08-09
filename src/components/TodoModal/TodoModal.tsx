import React, { useEffect } from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  loading: boolean,
  setSelectedTodo: (value: Todo | null) => void,
  selectedTodo?: Todo | null,
  user?: User | null,
  setLoading: (value: boolean) => void,
  setUser: (value: User) => void,
  todo: Todo,
};

export const TodoModal: React.FC<Props> = ({
  loading,
  setSelectedTodo,
  selectedTodo,
  user,
  setLoading,
  setUser,
  todo,
}) => {
  useEffect(() => {
    setLoading(true);
    getUser(todo.userId).then(setUser).finally(() => setLoading(false));
  }, [todo.userId]);

  return (
    <div
      className={classNames('modal', { ' is-active': selectedTodo })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {loading && (
        <Loader />
      )}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${selectedTodo?.id}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => setSelectedTodo(null)}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {selectedTodo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {selectedTodo?.completed
              ? <strong className="has-text-success">Done</strong>
              : <strong className="has-text-danger">Planned</strong>}

            {' by '}

            <a href={`mailto:${user?.email}`}>
              {user?.name}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
