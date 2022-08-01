import { SortType } from '../../types/Filter';

type Props = {
  onSelectStatus: (filterType: SortType) => void,
  changeQuery: (value: string) => void,
  query: string,
};

export const TodoFilter: React.FC<Props> = ({
  onSelectStatus,
  changeQuery,
  query,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectStatus(event.target.value as SortType);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChange}
          >
            <option value={SortType.ALL}>All</option>
            <option value={SortType.ACTIVE}>Active</option>
            <option value={SortType.COMPLETED}>Completed</option>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => changeQuery('')}
          />
        </span>
      </p>
    </form>
  );
};
