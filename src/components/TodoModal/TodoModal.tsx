import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo, User } from '../../types';

type Props = {
  currentTodo: Todo | null,
  setCurrentTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
};

export const TodoModal = ({ currentTodo, setCurrentTodo } : Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        if (currentTodo) {
          const data = await getUser(currentTodo.userId);

          setUser(data);
        }
      } catch (err : unknown) {
        if (err instanceof Error) {
          setError('404 User Not Found');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [currentTodo]);

  return (
    <div
      className={classNames('modal', {
        'is-active': currentTodo,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isLoading
        ? (
          <Loader />
        ) : (
          <div className="modal-card">
            { error && (
              <>
                <header
                  className="modal-card-head"
                  style={{
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 6,
                  }}
                >
                  <div
                    className="modal-card-title has-text-weight-medium"
                  >
                    {error}
                  </div>

                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    type="button"
                    className="delete"
                    onClick={() => setCurrentTodo(null)}
                  />
                </header>
              </>
            )}
            { !error && user && currentTodo && (
              <>
                <header className="modal-card-head">
                  <div
                    className="modal-card-title has-text-weight-medium"
                    data-cy="modal-header"
                  >
                    {`Todo #${currentTodo.id}`}
                  </div>

                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    type="button"
                    className="delete"
                    data-cy="modal-close"
                    onClick={() => setCurrentTodo(null)}
                  />
                </header>

                <div className="modal-card-body">
                  <p className="block" data-cy="modal-title">
                    {currentTodo.title}
                  </p>

                  <p className="block" data-cy="modal-user">
                    {/* <strong className="has-text-success">Done</strong> */}
                    <strong
                      className={currentTodo.completed
                        ? 'has-text-success'
                        : 'has-text-danger'}
                    >
                      {currentTodo.completed
                        ? 'Done'
                        : 'Planned'}
                    </strong>

                    {' by '}
                    <a href={`mailto:${user?.email}`}>
                      {user?.name}
                    </a>
                  </p>
                </div>
              </>
            ) }
          </div>
        )}
    </div>
  );
};
