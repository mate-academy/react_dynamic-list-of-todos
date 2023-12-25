import React, { useContext } from 'react';
import { TodosContext } from '../../services/Store';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo,
  user: User | null,
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, user }) => {
  const {
    loading,
    setLoading,
    setDisplayTodoModal,
    setSelectedTodoId,
  } = useContext(TodosContext);

  const {
    title,
    id,
    completed,
  } = selectedTodo;

  const crossInModalHandler = () => {
    setLoading(false);
    setDisplayTodoModal(false);
    setSelectedTodoId(0);
  };

  return (
    <div className="modal is-active" data-cy="modal">
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
              Todo #
              {id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={crossInModalHandler}
            />

          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {
                  user
                    ? user.name
                    : '******'
                }
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
