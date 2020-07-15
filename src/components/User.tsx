import React from 'react';

export const User: React.FC<{name: string | undefined}> = ({ name }) => (
  <td>{name}</td>
);
