import {
  useEffect,
  memo,
  useState,
  FC,
} from 'react';
import cn from 'classnames';
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

    useEffect(() => {
      try {
        getUser(todo.userId)
          .then(setSelectedUser);
      } catch {
        setSelectedUser(null);
      }
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
                onClick={onCancelModal}
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
                <strong className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })
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
