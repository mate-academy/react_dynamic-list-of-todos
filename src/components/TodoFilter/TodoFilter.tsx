import { useEffect, useState } from 'react';
import { Select } from '../../types/Select';

interface Props {
  onSelect: (value: Select) => void;
  onChange: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({ onSelect, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(Select.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    onSelect(selectedOption);
    onChange(query);
  }, [selectedOption, query]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={(event) => (
              setSelectedOption(event.target.value as Select))}
          >
            <option value={Select.All}>All</option>
            <option value={Select.Active}>Active</option>
            <option value={Select.Completed}>Completed</option>
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>

          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
