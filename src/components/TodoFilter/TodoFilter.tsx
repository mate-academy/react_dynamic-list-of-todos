import { ListAction } from '../Enum/ListAction';

type Props = {
  setFilter: (filter: ListAction) => void;
  setApplyQuery: (query: string) => void;
  applyQuery: string;
};

export const TodoFilter: React.FC<Props> = ({
  setFilter,
  setApplyQuery,
  applyQuery,
}) => {
  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplyQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              setFilter(event.target.value as ListAction);
            }}
          >
            <option value={ListAction.ALL}>All</option>
            <option value={ListAction.ACTIVE}>Active</option>
            <option value={ListAction.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={applyQuery}
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>

          {applyQuery.length > 0 && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setApplyQuery('')}
            />
          )}

        </span>
      </p>
    </form>
  );
};
