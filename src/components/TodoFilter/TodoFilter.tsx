import React from 'react';

type Props = {
  inputState: string;
  setInputState: (inputState: string) => void;
  setToggleFilter: (toggleFilter: boolean | null) => void;
};

const options = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

const getToggleValue = (value: string, setToggleFilter:
Props['setToggleFilter']) => {
  switch (value) {
    case 'active':
      setToggleFilter(false);
      break;

    case 'completed':
      setToggleFilter(true);
      break;

    default:
      setToggleFilter(null);
      break;
  }
};

export const TodoFilter: React.FC<Props> = ({
  inputState,
  setInputState,
  setToggleFilter,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => getToggleValue(e.target.value, setToggleFilter)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputState}
          onChange={(event) => setInputState(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputState && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setInputState('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
