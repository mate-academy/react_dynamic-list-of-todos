import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  onSelectTodo: (value: Todo | null) => void,
  selectTodo: Todo,
};

export const TodoModal: React.FC<Props> = ({ onSelectTodo, selectTodo }) => {
  const [selectUser, setSelectUser] = useState<User>();

  useEffect(() => {
    getUser(selectTodo.userId).then(response => setSelectUser(response));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onSelectTodo(null)}
              aria-label="close_button"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': selectTodo.completed,
                  'has-text-danger': !selectTodo.completed,
                })}
              >
                {selectTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${selectUser.email}`}>
                {selectUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
