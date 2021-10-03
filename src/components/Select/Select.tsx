import React from 'react';

type Props = {
  selectedUsers: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: React.FC<Props> = React.memo((props) => {
  return (
    <select
      name=""
      id=""
      onChange={props.selectedUsers}
    >
      <option value="All">
        All
      </option>
      <option value="Active">
        Active
      </option>
      <option value="Completed">
        Completed
      </option>
    </select>
  );
});
