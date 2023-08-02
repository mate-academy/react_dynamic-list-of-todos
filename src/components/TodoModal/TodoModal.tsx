import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (selectedTodo !== null) {
      getUser(selectedTodo.userId).then(setUser)
        .finally(() => setLoading(false));
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {loading
          ? <Loader />
          : (
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
                  {/* <strong className="has-text-success">Done</strong> */}
                  <strong className={classNames({
                    'has-text-danger': !selectedTodo?.completed,
                    'has-text-success': selectedTodo?.completed,
                  })}
                  >
                    {selectedTodo?.completed
                      ? 'Done'
                      : 'Planned'}
                  </strong>

                  {' by '}

                  <a href="mailto:Sincere@april.biz">
                    {user?.name}
                  </a>
                </p>
              </div>
            </div>
          )}
      </div>
    </>
  );
};
