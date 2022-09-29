import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  selectedTodoId: number;
  setselectedTodoId: (value: number) => void,
  todos: Todo[]
}

export const TodoModal: React.FC<Props> = ({
  selectedTodoId,
  setselectedTodoId,
  todos,
}) => {
  const [user, setUser] = useState<User>();
  const selectedTodo = todos.find(({ id }) => id === selectedTodoId);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTodo) {
        const userFromServer = await getUser(selectedTodo.userId);

        setUser(userFromServer);
      }
    };

    fetchData();
  }, [selectedTodoId]);

  const selectedTodoIds = todos.filter(todo => todo.id === selectedTodoId);
  const hadlerClick = () => {
    setselectedTodoId(0);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          {selectedTodoIds.map(({ id, title, completed }) => (
            <>
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${id}`}
                </div>
                <button
                  type="button"
                  aria-label="delete"
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
