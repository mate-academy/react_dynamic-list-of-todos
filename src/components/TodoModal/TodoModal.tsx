import { FC, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';

interface Props {
  recentTodo: Todo;
  handleCloseModal: () => void;
  selectedButton: number;
  todos: Todo[];
}
export const TodoModal: FC<Props> = ({
  recentTodo,
  handleCloseModal,
  selectedButton,
  todos,
}) => {
  const {
    id,
    title,
    completed,
  } = recentTodo || {};

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todos && selectedButton > 0) {
      const { userId } = todos[selectedButton - 1];

      getUser(userId).then(result => {
        setUser(result);
      });
    }
  }, [selectedButton]);

  const { email, name } = user || {};

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {
        user
          ? (
            <div className="modal-card">
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
                  onClick={handleCloseModal}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  {
                    completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>
                  }
                  {' by '}

                  <a href={`mailto:${email}`}>{name}</a>
                </p>
              </div>
            </div>
          )
          : <Loader />
      }
    </div>
  );
};
