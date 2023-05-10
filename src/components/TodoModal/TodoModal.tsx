import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo | null;
  setClickedTodoId: (id: number) => void;
  clickedTodoId: number;
}

export const TodoModal: React.FC<Props> = memo(({
  todo,
  setClickedTodoId,
  clickedTodoId,
}) => {
  const [user, setUser] = useState<User | null>(null);
  // const [isShowLoader, setIsShowLoader] = useState(true);

  const loadedUser = useCallback(
    async () => {
      try {
        const userFromServer = await getUser(clickedTodoId);

        setUser(userFromServer);
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    }, [],
  );

  const handleModalClose = () => {
    setClickedTodoId(0);
  };

  useEffect(() => {
    loadedUser();
    // setIsShowLoader(false);
  }, [user]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {/* {isShowLoader ? ( */}
      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${user?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={cn(
                { 'has-text-success': todo?.completed },
                { 'has-text-danger': !todo?.completed },
              )}
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
