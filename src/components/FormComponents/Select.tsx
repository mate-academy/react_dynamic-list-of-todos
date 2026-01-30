import React from 'react';
import { options } from '../../constants/constants';

type Props = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: React.FC<Props> = ({ onChange }) => {
  return (
    <select data-cy="statusSelect" onChange={onChange}>
      {options.map(option => {
        const [value, name] = option;

        return (
          <option key={value} value={value}>
            {name}
          </option>
        );
      })}
    </select>
  );
};
