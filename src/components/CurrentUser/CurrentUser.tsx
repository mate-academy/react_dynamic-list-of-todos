import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { request, USERS_URL } from '../API/api';
import './CurrentUser.scss';

enum Error {
  Initial = '',
  Error = 'Can\'t download user',
}

type Props = {
  userId: number;
  selectNewUser: (x: number) => void;
};

export const CurrentUser: FC<Props> = ({
  userId,
  selectNewUser,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userError, setUserError] = useState(Error.Initial);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userFromServer = await request(USERS_URL, `/${userId}`);

        setUser(userFromServer);
        setUserError(Error.Initial);
      } catch {
        setUser(null);
        setUserError(Error.Error);
      }
    };

    getUser();
  }, [userId]);

  const clearUser = useCallback(() => {
    selectNewUser(0);
  }, []);

  return (
    <>
      {user && (
        <div className="CurrentUser">
          <button
            type="button"
            className="button CurrentUser__button"
            onClick={clearUser}
          >
            Clear user
          </button>
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${user.id}`}</span>
          </h2>

          <h3
            className="CurrentUser__name"
            data-cy="userName"
          >
            {user.name}
          </h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </div>
      )}
      {userError && <h2>{userError}</h2>}
    </>
  );
};
