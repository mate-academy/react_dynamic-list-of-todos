import { FilterOption } from '../../types/FilterOption';

type Props = {
  query: string;
  onChange: (newValue: string) => void;
  options: FilterOption[];
  selectedOption: FilterOption;
  onSelect: (newValue: FilterOption) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChange,
  options,
  selectedOption,
  onSelect,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value as FilterOption);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
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
            {options.map(option => (
              <option value={option} key={option}>
                {option[0].toUpperCase() + option.slice(1)}
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
          value={query}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
