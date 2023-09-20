/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { SyntheticEvent, useState } from 'react';

type Props = {
  handleQuery: (value: string) => void;
  handleOption: (value: boolean | null) => void;
};

// eslint-disable-next-line max-len
const handleOptions = (newOption: string, handleOption: (value: boolean | null) => void) => {
  let booleanOption: boolean | null = null;

  switch (newOption) {
    case 'all':
      booleanOption = null;
      break;
    case 'active':
      booleanOption = false;
      break;
    case 'completed':
      booleanOption = true;
      break;
    default:
      booleanOption = null;
  }

  handleOption(booleanOption);
};

export const TodoFilter: React.FC<Props> = ({ handleQuery, handleOption }) => {
  const [query, setQuery] = useState('');
  // eslint-disable-next-line max-len
  const [selectedOption, setSelectedOption] = useState<string | 'all' | 'completed' | 'active'>('all');

  const handleQueryValue = (event: SyntheticEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value.trim();

    setQuery(newValue);
    handleQuery(newValue);
  };

  const handelClearQuery = () => {
    setQuery('');
    handleQuery('');
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;

    setSelectedOption(newOption);
    handleOptions(newOption, handleOption);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleQueryValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handelClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
