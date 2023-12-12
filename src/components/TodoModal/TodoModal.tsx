import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  onSelect: Dispatch<SetStateAction<Todo | undefined>>;
  todoSelected: Todo;
};

export const TodoModal: React.FC<Props> = ({ onSelect, todoSelected }) => {
  const [todoLoading, setTodoLoading] = useState(true);
  const [todoUser, setTodoUser] = useState<User>();

  useEffect(() => {
    getUser(todoSelected.userId)
      .then((givenUser) => {
        setTodoUser(givenUser);
      })
      .finally(() => setTodoLoading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {todoLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoSelected.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onSelect(undefined)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoSelected.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-success': todoSelected.completed,
                  'has-text-danger': !todoSelected.completed,
                })}
              >
                {todoSelected.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${todoUser?.email}`}>
                {todoUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
