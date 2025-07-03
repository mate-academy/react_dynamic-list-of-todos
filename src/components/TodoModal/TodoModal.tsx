import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type UserInfo = {
  userId: number;
  todo: Todo;
};

type Prop = {
  userInfo: UserInfo;
  reset: () => void;
};

type TodoInfo = {
  userId: number;
  name: string;
  email: string;
  title: string;
  id: number;
  completed: boolean;
};

export const TodoModal: React.FC<Prop> = ({ userInfo, reset }) => {
  const [loader, setLoader] = useState(true);
  const [todoInfo, setTodoInfo] = useState<TodoInfo | null>(null);

  const { userId, todo } = userInfo;

  useEffect(() => {
    getUser(userId).then(info => {
      setLoader(false);
      setTodoInfo({
        userId,
        name: info.name,
        email: info.email,
        title: todo.title,
        id: todo.id,
        completed: todo.completed,
      });
    });
  }, [userId, todo.completed, todo.id, todo.title]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader ? (
        <Loader />
      ) : (
        todoInfo && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {'Todo #' + todoInfo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={reset}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todoInfo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong
                  className={
                    todoInfo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todoInfo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={'mailto:' + todoInfo.email}>{todoInfo.name}</a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
