import React from 'react';

interface Props {
  name: string;
}

export const UserItem: React.FC<Props> = ({ name }) => {
  return (
    <td>{name}</td>
  );
};