import React, { Dispatch, SetStateAction } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todoModal: Todo,
  loadingModal: boolean,
  user: User | null,
  setTodoModal: Dispatch<SetStateAction<Todo | null>>,
};

export const TodoModal: React.FC<Props> = ({
  todoModal,
  loadingModal,
  user,
  setTodoModal,
}) => {
  // useEffect(() => {

  // }, [todoModal]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {
        loadingModal ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todoModal.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setTodoModal(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todoModal.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todoModal.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}
                {' by '}
                <a href="mailto:Sincere@april.biz">{user && user.name}</a>
              </p>
            </div>
          </div>
        )
      }
    </div>
  );
};
