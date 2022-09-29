import React from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  setSelectedTodoId: (id: number) => void;
};

export const TodoModal: React.FC<Props>
  = ({
    todos,
    selectedTodoId,
    setSelectedTodoId,
  }) => {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
      const loadUser = async () => {
        const userFromServer = await getUser(todos[selectedTodoId - 1].userId);

        setUser(userFromServer);
      };

      loadUser();
    }, [selectedTodoId]);

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {!user ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodoId}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setSelectedTodoId(-1)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todos[selectedTodoId - 1].title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong className="has-text-danger">Planned</strong>

                {' by '}

                <a href="mailto:Sincere@april.biz">
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };
