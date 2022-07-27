/* import { Todo } from '../../types/Todo'; */
import { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo | null
  onClose: () => void
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    const getUserFromServer = async () => {
      if (selectedTodo) {
        await getUser(selectedTodo.userId)
          .then(selectedUser => {
            setUser(selectedUser);
          });
        setIsUserLoading(true);
      }
    };

    try {
      getUserFromServer();
    } catch (error) {
      throw new Error('Failed to load user from server');
    }
  }, [user]);

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      {!isUserLoading
        ? (
          <Loader />
        )
        : (
          <>
            {!selectedTodo
              ? ('no todo')
              : (
                <div className="modal-card">
                  <header className="modal-card-head">
                    <div className="modal-card-title has-text-weight-medium">
                      {`Todo: #${selectedTodo.id}`}
                    </div>
                    <a
                      href="#close"
                      className="delete"
                      onClick={onClose}
                    >
                      Close
                    </a>
                  </header>

                  <div className="modal-card-body">
                    <p className="block">{selectedTodo.title}</p>

                    <p className="block">
                      {selectedTodo.completed
                        ? (<strong className="has-text-success">Done</strong>)
                        : (
                          <strong
                            className="has-text-danger"
                          >
                            Planned
                          </strong>
                        )}
                      {' by '}
                      <a href={`mailto:${user?.email}`}>
                        {user?.name}
                      </a>
                    </p>
                  </div>
                </div>
              )}
          </>
        )}
    </div>
  );
};
