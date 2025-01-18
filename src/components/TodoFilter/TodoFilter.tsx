import { SelectOptions } from '../../types/SelectOptions';

type Props = {
  query: string;
  selectedOption: SelectOptions;
  onQuery: (newQuery: string) => void;
  onSelectOption: (newOption: SelectOptions) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  selectedOption,
  onQuery = () => {},
  onSelectOption = () => {},
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={e => onSelectOption(e.target.value as SelectOptions)}
          >
            <option value={SelectOptions.ALL}>All</option>
            <option value={SelectOptions.ACTIVE}>Active</option>
            <option value={SelectOptions.COMPLETED}>Completed</option>
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
          onChange={e => onQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
