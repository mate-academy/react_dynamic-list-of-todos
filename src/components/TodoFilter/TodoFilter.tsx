import { useState } from 'react';

type Props = {
  onInputChange: (value: string) => void;
  onFilterSelect: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  onInputChange,
  onFilterSelect,
}) => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [inputValue, setInputValue] = useState('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={currentFilter}
            onChange={(event) => {
              setCurrentFilter(event.currentTarget.value);
              onFilterSelect(event.currentTarget.value);
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
          value={inputValue}
          onChange={event => {
            onInputChange(event.target.value);
            setInputValue(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputValue && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onInputChange('');
                setInputValue('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
