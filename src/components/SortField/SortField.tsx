import React, { FC } from 'react';

interface SortFieldProps {
  name: string;
  position: string;
  handleChange(sortName: string): void;
  isActive: boolean;
}

export const SortField: FC<SortFieldProps> = ({
  name,
  position,
  isActive,
  handleChange,
}) => (
  <div className={`col s4 ${position}-align`}>
    <label htmlFor={`sortBy${name}`}>
      <input
        type="checkbox"
        id={`sortBy${name}`}
        checked={isActive}
        onChange={() => handleChange(name)}
      />
      <i className={`medium material-icons arrow ${isActive && 'arrow--active'}`}>
        arrow_drop_down
      </i>
    </label>
  </div>
);
