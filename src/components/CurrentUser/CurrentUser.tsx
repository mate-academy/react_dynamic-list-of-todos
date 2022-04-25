import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';

type Props = {
  userId: number,
};

export const CurrentUser: React.FC<Props> = ({ userId }) => {
  const [id, newId] = useState(0);
  const [name, newName] = useState('');
  const [email, newEmail] = useState('');
  const [phone, newPhone] = useState('');
  const [showInfo, dontShowInfo] = useState(false);

  const clearUser = () => {
    dontShowInfo(false);
  };

  // eslint-disable-next-line consistent-return
  const getUser = async () => {
    const response = fetch(`https://mate.academy/students-api/users/${userId}`);
    const user: Promise<User> = (await response).json();

    try {
      newId((await user).id);
      newName((await user).name);
      newEmail((await user).email);
      newPhone((await user).phone);
      dontShowInfo(true);
    } catch (error) {
      clearUser();
    }
  };

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  return (
    <>
      {showInfo && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {` ${id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{name}</h3>
          <p className="CurrentUser__email">{email}</p>
          <p className="CurrentUser__phone">{phone}</p>
          <button
            type="button"
            onClick={clearUser}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
};
