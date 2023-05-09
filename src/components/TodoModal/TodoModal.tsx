import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: number;
  setTodo: (id: number) => void;
  todosList: Todo[];
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  todosList,
  setTodo,
}) => {
  const [user, setUser] = React.useState<User>();

  const todo = todosList.filter((todoItem) => todoItem.id === selectedTodo);

  useEffect(() => {
    getUser(todo[0].userId).then((person) => setUser(person));
  }, []);

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
              {`Todo #${todo[0].id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              onClick={() => setTodo(0)}
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo[0].title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  todo[0].completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo[0].completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
