import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import './CurrentUser.scss';
import { preparedUser } from '../../Api/Api';
import { UserType } from '../../types/UserType';

type Props = {
  idOfUser: number,
  setSelectedUserId: Dispatch<SetStateAction<any>>
};

export const CurrentUser: React.FC<Props> = (
  { idOfUser, setSelectedUserId },
) => {
  const [user, setUser] = useState<UserType>({
    name: '',
    phone: '',
    username: '',
    website: '',
    email: '',
  });

  async function totalDataOfUser(id: number) {
    const User = await preparedUser(id);

    setUser(User);
  }

  useEffect(() => {
    totalDataOfUser(idOfUser);
  }, [idOfUser]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {user.username}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
      <button
        type="button"
        onClick={() => setSelectedUserId(null)}
      >
        Clear
      </button>
    </div>
  );
};
