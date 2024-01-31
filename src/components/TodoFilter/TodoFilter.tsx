import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Filters } from '../../types/Filters';

interface Props {
  onFilter: Dispatch<SetStateAction<Filters>>,
}

const options = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export const TodoFilter: React.FC<Props> = ({ onFilter }) => {
  const [query, setQuery] = useState('');

  const handleSelect
    = (event: React.ChangeEvent<HTMLSelectElement>) => onFilter(prevState => ({
      ...prevState,
      status: event.target.value,
    }));

  useEffect(() => {
    onFilter(prevFilter => ({ ...prevFilter, title: query }));
  }, [query, onFilter]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
          >
            {options.map(option => (
              <option
                value={option.value}
                key={option.value}
              >
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
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
