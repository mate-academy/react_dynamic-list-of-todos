import React, {useEffect, useState} from 'react';
import './CurrentUser.scss';
import {getUsers} from "../../api";

type Props = {
  userId: number,
  clearUser: () => void
};

export const CurrentUser: React.FC<Props> = ({userId, clearUser}) => {
  const [isError, setIsError] = useState(false);
  const [currentUser, setUser] = useState<User | null>(null);

  const getUser = async () => {
    try {
      const getedUser = await getUsers(userId);

      setIsError(false);
      setUser(getedUser);
    } catch {
      setIsError(true);
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <>
      { currentUser && (
        <div className="CurrentUser" key={currentUser.id}>

          <h2 className="CurrentUser__title"><span>Selected user: {currentUser.email} </span></h2>

          <h3 className="CurrentUser__name">name : {currentUser.name}</h3>
          <p className="CurrentUser__phone">phone : {currentUser.phone}</p>

          <button
            type="button"
            className="button is-light CurrentUser__clear"
            onClick={clearUser}
          >
            Clear
          </button>

        </div>
      )}

      { isError && (
        <h3>Error!!!</h3>
      )}

    </>
    )
};
