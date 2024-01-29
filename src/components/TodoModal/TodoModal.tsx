import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { TodosContext } from '../TodosContext/TodosContext';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  currentUser: number,
  todos: Todo[] | null,
};

export const TodoModal: React.FC<Props> = ({ currentUser, todos }) => {
  const { handleShowModal, currentTodo } = useContext(TodosContext);

  const [cu, setCU] = useState<User | null>(null);
  const [cT, setCT] = useState<Todo | null>(null);

  useEffect(() => {
    getUser(currentUser).then((user) => {
      setCU(user);
    });
    let todo;

    if (todos !== null) {
      todo = todos.find(t => t.id === currentTodo);
    }

    if (todo !== undefined) {
      setCT(todo);
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!cu ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${cT?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleShowModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {cT?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {cT?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href={`mailto:${cu.email}`}>
                {cu.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
