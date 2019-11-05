import React from 'react';

export default function({ user }) {
  return (
    <>
      <td>{user.name}</td>
      <td>
        <a href={`mailto:${user.email}`}
            className="text-white"
        >
          {user.email}
        </a>
      </td>
    </>
  );
}
