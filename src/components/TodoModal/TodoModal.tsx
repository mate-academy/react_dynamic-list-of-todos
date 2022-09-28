import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getTodos, getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  userId: number;
  selectedTodoId: number;
  selectedTodo: (todo: number) => void,
  selectedUserId: (id: number) => void,
};

export const TodoModal: React.FC<Props> = ({
  userId,
  selectedTodoId,
  selectedTodo,
  selectedUserId,
}) => {
  const [user, setUser] = useState<User>();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadedData = async () => {
      const [userFromServer, todosFromServer] = await Promise.all([
        getUser(userId), getTodos()]);

      setUser(userFromServer);
      setTodos(todosFromServer);
    };

    loadedData();
  }, [selectedTodoId]);

  const selectedTodos = todos.filter(({ id }) => id === selectedTodoId);

  const handleModalClose = () => {
    selectedTodo(0);
    selectedUserId(0);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          {selectedTodos.map(({ id, title, completed }) => (
            <>
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={handleModalClose}
                />
              </header>
              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  {completed === true
                    ? (<strong className="has-text-success">Done</strong>)
                    : (<strong className="has-text-danger">Planned</strong>)}

                  {' by '}

                  <a href="mailto:Sincere@april.biz">
                    {user.name}
                  </a>
                </p>
              </div>

            </>

          ))}

        </div>
      )}
    </div>
  );
};
