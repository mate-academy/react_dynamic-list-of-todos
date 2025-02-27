import { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { defaultTodo } from '../../App';

interface Props {
  setModalActive: (value: boolean) => void;
  selectedTodo: Todo;
  setSelectedTodo: (value: Todo) => void;
}

export const TodoModal = ({
  setModalActive,
  selectedTodo,
  setSelectedTodo,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        await getUser(selectedTodo.userId);
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [selectedTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card" data-cy="todo">
          {errorMessage}
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
              onClick={() => {
                setModalActive(false);
                setSelectedTodo(defaultTodo);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${selectedTodo.user.email}`}>
                {selectedTodo.user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
