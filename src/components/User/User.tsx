import './User.scss';
import {
  FC, memo, useEffect, useState,
} from 'react';
import { getUserById } from '../../api/api';
import { useSelectedUserIdContext } from '../../contexts/SelectedUserIdContext';

export const User: FC = memo(() => {
  const {
    selectedUserId: userId,
    setSelectedUserId: handleClear,
  } = useSelectedUserIdContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [isAvailable, setAvailable] = useState(true);
  const [isFailed, setFailed] = useState(false);

  useEffect(() => {
    getUserById(userId)
      .then(user => {
        if (!user) {
          setAvailable(false);
        } else {
          setName(user.name);
          setEmail(user.email);
          setPhone(user.phone);
        }
      })
      .catch(() => setFailed(true));
  }, [userId]);

  return isAvailable ? (
    <div className="User">
      <h2 className="User__title">
        <span>
          {`Selected user: ${userId}`}
        </span>
      </h2>

      <h3 className="User__name">
        {name}
      </h3>

      <p className="User__email">
        {email.toLowerCase()}
      </p>

      <p className="User__phone">
        {phone}
      </p>

      <button
        className="User__clear button"
        type="button"
        onClick={() => handleClear(0)}
      >
        Clear
      </button>
    </div>
  ) : (
    <h2 className="User__error">
      {isFailed
        ? 'Failed to load user!'
        : 'Loading...'}
    </h2>
  );
});
