import { useState } from 'react';

type Props = {
  handleSelectOption: (value: string) => void;
  handleInputChange: (value: string) => void;
  field: string;
  value: string;
};

export const TodoFilter: React.FC<Props> = ({
  handleSelectOption,
  field,
  handleInputChange,
  value,
}) => {
  const [isFiltering, setIsFiltering] = useState(false);

  const handleButtonClear = () => {
    setIsFiltering(false);
    handleInputChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => {
              if (e.target.value !== field) {
                handleSelectOption(e.target.value);
              }
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={value}
          onChange={e => {
            handleInputChange(e.target.value);
            setIsFiltering(true);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {isFiltering && value !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleButtonClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
