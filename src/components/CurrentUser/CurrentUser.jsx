import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export const CurrentUser = ({ userId, onClear, onSelected }) => {
  const [user, setUser] = useState(0);

  useMemo(async() => {
    const curentUser = await getUser(userId);

    if (!curentUser) {
      onSelected(0);
    } else {
      setUser(curentUser);
    }
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:&nbsp;
          {user.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
      <button
        type="submit"
        onClick={() => onClear(0)}
      >
        Clear
      </button>
    </div>
  );
};

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
};
