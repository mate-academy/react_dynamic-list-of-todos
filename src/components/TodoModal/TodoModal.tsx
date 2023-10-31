/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo
  setSelectedTodo: (val: Todo | null) => void
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, setSelectedTodo }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getUser(selectedTodo.userId)
        .finally(() => setLoading(false));
    }, 300);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading
        ? (<Loader />)
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo.id}`}
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
                {selectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo.completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)}

                {' by '}

                <a href="mailto:Sincere@april.biz">
                  {selectedTodo.completed
                    ? ('Ervin Howell')
                    : ('Leanne Graham')}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
