import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';

interface Props {
  id: number;
  title: string;
  completed: boolean;
  name: string;
  setTargetTodo: (todo: null) => void;
}

export const TodoModal: React.FC<Props> = ({
  id,
  title,
  completed,
  name,
  setTargetTodo,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

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
              Todo #{id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setTargetTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
