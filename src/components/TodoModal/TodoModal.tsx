import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  selectedTodo: Todo,
  setTodoId: (v:number) => void,
}

export const TodoModal: React.FC<Props> = (props) => {
  const { selectedTodo, setTodoId } = props;
  const [user, setUser] = useState<User | null>(null);
  const onClose = () => {
    setTodoId(0);
  };

  useEffect(() => {
    if (selectedTodo !== undefined) {
      getUser(selectedTodo.userId)
        .then(setUser);
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      { (selectedTodo == null || user === null) ? (
        <Loader />
      ) : (
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
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={cn(selectedTodo.completed
                  ? 'has-text-success'
                  : 'has-text-danger')}
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
