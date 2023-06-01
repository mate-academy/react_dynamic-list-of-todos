import { useState } from 'react';

type Props = {
  selectValue: string;
  onSelectStatus: (status: string) => void;
  onApplyQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = (
  {
    selectValue,
    onSelectStatus,
    onApplyQuery,
  },
) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
    onApplyQuery(value);
  };

  const handleInputReset = () => {
    setInputValue('');
    onApplyQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => onSelectStatus(event.target.value)}
            value={selectValue}
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleInputReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
