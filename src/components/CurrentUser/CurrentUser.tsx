import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import './CurrentUser.scss';

import { getUser } from '../../api/todos';
import { Loader } from '../Loader';
import { User } from '../types';

type Props = {
  selectedUserId: number,
  setSelectedUserId: (userId: number) => void,
  setSelectedTodoId: (todoId: number) => void,
};

export const CurrentUser: React.FC<Props> = React.memo(({
  selectedUserId,
  setSelectedUserId,
  setSelectedTodoId,
}) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setLoading] = useState(true);

  const placeholder = useMemo(() => {
    return isLoading ? <Loader /> : <p>User not found</p>;
  }, [isLoading]);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setUser(undefined);
    setUser(await getUser(selectedUserId));
    setLoading(false);
  }, [selectedUserId]);

  useEffect(() => {
    fetchUser();
  }, [selectedUserId]);

  return (
    !user
      ? placeholder
      : (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${selectedUserId}`}</span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <button
            type="button"
            className="CurrentUser__clear button"
            onClick={() => {
              setSelectedUserId(0);
              setSelectedTodoId(0);
            }}
          >
            Clear
          </button>
        </div>
      )
  );
});
