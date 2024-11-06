import { useState } from 'react';
import { Filter } from '../../types/enumFilter';

type Props = {
  filterByFlag: (value: Filter) => void;
  filteredByValue: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterByFlag,
  filteredByValue,
}) => {
  const [showButton, setShowButton] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleFilterByFlag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterByFlag(e.target.value as Filter);
  };

  const handleFilterByValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowButton(true);
    filteredByValue(inputValue);

    if (e.target.value === '') {
      setShowButton(false);
    }
  };

  const handleClearValue = () => {
    setInputValue('');
    setShowButton(false);
    filteredByValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterByFlag}>
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleFilterByValue}
          value={inputValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {showButton && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleClearValue()}
            />
          </span>
        )}
      </p>
    </form>
  );
};
