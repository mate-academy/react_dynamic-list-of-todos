import { Filter } from '../../types/Filter';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  filterBy: Filter;
  onFilterByChange: (filter: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  filterBy,
  onFilterByChange,
}) => {
  const getTextForOption = (option: string) => {
    const correctedOption = option.split('');

    correctedOption[0] = correctedOption[0].toUpperCase();

    return correctedOption.join('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={(event) => onFilterByChange(event.target.value as Filter)}
          >
            {Object.values(Filter).map((value) => (
              <option key={value} value={value}>
                {getTextForOption(value)}
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
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length !== 0
        && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onQueryChange('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
