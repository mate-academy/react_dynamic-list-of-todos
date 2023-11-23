import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../TodoContext';

import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  setModel: (isOpen: boolean) => void,
};

export const TodoModal: React.FC<Props> = ({ setModel }) => {
  const { todos, selectedIdTodo, setSelectedIdTodo } = useContext(TodoContext);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const selectedTodo = todos.find(todo => todo.id === selectedIdTodo);

  useEffect(() => {
    getUser(selectedTodo?.userId as number)
      .then((userFromServer) => {
        setSelectedUser(userFromServer);
        setIsLoadingUser(false);
      });
  }, [selectedTodo]);

  const closeTodoModel = () => {
    setSelectedIdTodo(0);
    setModel(false);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {
        isLoadingUser ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={closeTodoModel}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong className={selectedTodo?.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {selectedTodo?.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`"mailto:${selectedUser?.email}`}>
                  {selectedUser?.name}
                </a>
              </p>
            </div>
          </div>
        )
      }
    </div>
  );
};
