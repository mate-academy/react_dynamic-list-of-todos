import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  setSelectedModel: (info: boolean) => void;
};

const TEST_PERSON = {
  id: 0,
  name: 'Test Testowski',
  email: 'test@test.test',
  phone: '123456789',
};

export const TodoModal: React.FC<Props> = (
  { selectedTodo, setSelectedModel },
) => {
  const [selectedPerson, setSelectedPerson] = useState<User>(TEST_PERSON);
  const [loadingTodoInfo, setLoadingTodoInfo] = useState<boolean>(false);

  useEffect(() => {
    setLoadingTodoInfo(true);
    getUser(selectedTodo.userId)
      .then(setSelectedPerson)
      .finally(() => setLoadingTodoInfo(false));
  }, []);

  // console.log(selectedModel, setSelectedModel);
  const handleCloseClick = () => {
    setSelectedModel(false);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingTodoInfo ? (
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
              onClick={handleCloseClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              <a href={`mailto:${selectedPerson.email}`}>
                {selectedPerson?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
