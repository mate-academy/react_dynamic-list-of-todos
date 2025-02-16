import React, { useState, useEffect } from 'react';

import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedTodo.userId).then(person => {
      setUser(person);
      setLoader(false);
    });
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader && <Loader />}
      {
        !loader && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            <button
              onClick={() => setSelectedTodo(null)}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  selectedTodo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>
              {
               ' by '
              }
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )
      }
    </div>
  );
};
