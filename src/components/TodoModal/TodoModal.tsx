import {
  useEffect,
  memo,
  useState,
  FC,
} from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  onCancelModal: () => void;
};

export const TodoModal: FC<Props> = memo(
  ({ todo, onCancelModal }) => {
    const [user, setSelectedUser] = useState<User | null>(null);

    const handleClickClose = () => {
      onCancelModal();
    };

    useEffect(() => {
      getUser(todo.userId)
        .then((person) => {
          setSelectedUser(person);

          window.console.log(person);
        });
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
                {`Todo #${todo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                onClick={handleClickClose}
                type="button"
                className="delete"
                data-cy="modal-close"
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong className={
                  todo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }>
                  {todo?.completed
                    ? 'Done'
                    : 'Planned'
                  }
                </strong>

                {' by '}

                <a href="mailto:Sincere@april.biz">
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);
