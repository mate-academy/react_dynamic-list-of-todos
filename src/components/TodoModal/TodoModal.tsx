import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { FullTodo } from '../../types/FullTodo';
import classNames from 'classnames';

type Props = {
  visibleModal: FullTodo | null;
  setVisibleTodo: (todo: FullTodo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  visibleModal,
  setVisibleTodo,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={classNames('modal', {
        'is-active': visibleModal,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{visibleModal && visibleModal.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setVisibleTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {visibleModal && visibleModal.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">
                {visibleModal && visibleModal.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={'mailto:' + visibleModal?.user?.email}>
                {visibleModal && visibleModal.user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
