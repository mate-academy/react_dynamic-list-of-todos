import { Completed, Filters, FiltersInput } from '../../types/Filters';

interface Props {
  filtersParams: Filters;
  onSetParam: FiltersInput;
}
export const TodoFilter: React.FC<Props> = ({ filtersParams, onSetParam }) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filtersParams.completedType}
            onChange={event => onSetParam('completedType', event.target.value)}
          >
            <option value={Completed.All}>All</option>
            <option value={Completed.Active}>Active</option>
            <option value={Completed.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filtersParams.searchByText}
          onChange={event => onSetParam('searchByText', event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {filtersParams.searchByText && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSetParam('searchByText', '')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
