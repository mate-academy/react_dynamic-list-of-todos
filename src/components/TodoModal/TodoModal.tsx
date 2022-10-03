import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getTodos, getUser } from '../../api';

type Props = {
  userId: number;
  selectedTodoId: number;
  selectedTodo: (value: number) => void,
  selectedUserId: (value: number) => void,
};

export const TodoModal: React.FC<Props> = ({
  userId,
  selectedTodoId,
  selectedTodo,
  selectedUserId,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [userFromServer, todosFromServer] = await Promise.all(
        [getUser(userId), getTodos()],
      );

      setUser(userFromServer);
      setTodos(todosFromServer);
    };

    loadData();
  }, []);

  const selectedTodos = todos.filter(({ id }) => id === selectedTodoId);

  const closeModal = () => {
    selectedTodo(0);
    selectedUserId(0);
  };

  return (
    // eslint-disable-next-line react/jsx-wrap-multilines
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user
        ? (<Loader />)
        : (
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
                    onClick={closeModal}
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
    </div>);
};
