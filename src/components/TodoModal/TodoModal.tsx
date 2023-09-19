/* eslint-disable max-len */
import React, { useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useFetch } from '../../hooks/useFetch';

interface Props {
  selectedTodo: Todo
  onModalClose: (value: null) => void
}

export const TodoModal: React.FC<Props> = ({ selectedTodo, onModalClose }: Props) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { dataCollection, isLoading } = useFetch<User>(async () => getUser(selectedTodo.id));

  console.log(dataCollection);

  // useEffect(() => {
  //   const loadUsers = async () => {
  //     if (selectedTodo) {
  //       setIsLoading(true);
  //       getUser(selectedTodo.userId)
  //         .then(data => setUser(data))
  //         .finally(() => setIsLoading(false));
  //     }
  //   };

  //   loadUsers();
  // }, []);


  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onModalClose(null); setUser(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={(selectedTodo.completed) ? 'has-text-success' : 'has-text-danger'}
              >
                {(selectedTodo.completed) ? 'Doned' : 'Planned'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                Leanne Graham
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
