import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getTodos, getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  userId: number;
  selectedTodoId: number;
  selectedTodo: (value: number) => void,
  selectedUserId: (value: number) => void,
}

export const TodoModal: React.FC<Props> = ({
  userId,
  selectedTodoId,
  selectedTodo,
  selectedUserId,
}) => {
  const [user, setUser] = useState<User>();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const todosFromServer = await getTodos();
      const userFromServer = await getUser(userId);

      setUser(userFromServer);
      setTodos(todosFromServer);
    };

    fetchData();
  }, [selectedTodoId]);

  const selectedTodos = todos.filter(todo => todo.id === selectedTodoId);
  const hadlerClick = () => {
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
                  onClick={hadlerClick}
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
