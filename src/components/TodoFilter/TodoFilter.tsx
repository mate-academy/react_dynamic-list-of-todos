import { CompletionFilter } from '../../types/CompletionFilter';

type Props = {
  searchQuery: string,
  changeSearchQuery: (value: string) => void,
  completionStatus: CompletionFilter,
  changeCompletionStatus: (value: CompletionFilter) => void,
};

export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  changeSearchQuery,
  completionStatus,
  changeCompletionStatus,
}) => {
  const capitalizeFirstLetter = (string: string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={completionStatus}
            data-cy="statusSelect"
            onChange={event => (
              changeCompletionStatus(event.target.value as CompletionFilter))}
          >
            {Object.values(CompletionFilter).map(value => (
              <option
                key={value}
                value={value}
              >
                {capitalizeFirstLetter(value)}
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
          value={searchQuery}
          onChange={(event) => changeSearchQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => changeSearchQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
