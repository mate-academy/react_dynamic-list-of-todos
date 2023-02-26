import { SortType } from '../../types/SortType';

type Props = {
  query: string;
  onChangeQuery: (request: string) => void;
  sortType: number;
  setSortType: (value: number) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  sortType,
  setSortType,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={String(sortType)}
            onChange={(event) => {
              switch (event.target.value) {
                case '1':
                  setSortType(SortType.ACTIVE);
                  break;
                case '2':
                  setSortType(SortType.COMPLETED);
                  break;

                default:
                  setSortType(SortType.ALL);
                  break;
              }
            }}
          >
            <option value="0">All</option>
            <option value="1">Active</option>
            <option value="2">Completed</option>
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
          onChange={(event) => {
            onChangeQuery(event.target.value);
          }}
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
            onClick={() => {
              onChangeQuery('');
            }}
          />
        </span>
      </p>
    </form>
  );
};
