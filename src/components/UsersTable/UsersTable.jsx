import React from 'react';

// add prop types to UsersTable
export const UsersTable = ({ users }) => (
  <table border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Position</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.position}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
