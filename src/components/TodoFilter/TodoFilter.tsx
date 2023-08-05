import { SelectStatus } from '../../types/SelectStatus';

type Props = {
  setSelectStatus: (select: SelectStatus) => void;
  query:string;
  setQuery:(query:string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setSelectStatus, query, setQuery,
}) => {
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectStatus(event.target.value as SelectStatus);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChangeSelect}
          >
            <option value={SelectStatus.ALL}>All </option>
            <option value={SelectStatus.ACTIVE}>Active</option>
            <option value={SelectStatus.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          className="input"
          placeholder="Search..."
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
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
