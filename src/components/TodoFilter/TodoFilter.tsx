import { useState } from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  onSelect: (filter: Filter) => void;
  onChange: (filter: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ onSelect, onChange }) => {
  const [query, setQuery] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value.toLowerCase();

    switch (value) {
      case Filter.All.toLowerCase():
        onSelect(Filter.All);
        break;
      case Filter.Active.toLowerCase():
        onSelect(Filter.Active);
        break;
      case Filter.Completed.toLowerCase():
        onSelect(Filter.Completed);
        break;
      default:
        onSelect(Filter.All);
        break;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setQuery(input);
    onChange(input);
  };

  const handleDelete = () => {
    setQuery('');
    onChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect}>
            <option value={Filter.All}>{Filter.All}</option>
            <option value={Filter.Active}>{Filter.Active}</option>
            <option value={Filter.Completed}>{Filter.Completed}</option>
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
          onChange={handleChange}
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
              onClick={handleDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
