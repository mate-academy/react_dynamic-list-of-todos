import React,{ useEffect, useState } from "react";
import {getUser} from '../../api';

export const CurrentUser = ({ user, onClear, selectedUserId, changeUser }) => {
  const [us, setUs] = useState(user);
  useEffect(() => {
    if (selectedUserId !== 0
      && selectedUserId !== user.id) {
      getUser(selectedUserId)
        .then((user) => {
          changeUser( user.data );
          setUs(user.data);
        });
    }
  })
  
  return (
    <div className="CurrentUser">
      <h2>
        Selected user:
        {us.id}
      </h2>
      <ul>
        <li>{us.name}</li>
        <li>{us.email}</li>
        <li>{us.phone}</li>
      </ul>
      <button
        type="button"
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  );
}
