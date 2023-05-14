import { FC, memo } from 'react';
import { FilterBy } from '../../types/FilterBy';

interface Props {
  query: string;
  onChangeQuery: (event: string) => void;
  onChangeApplyQuery : (event: string) => void;
  onChangeOption: (event: FilterBy) => void;
}

export const TodoFilter: FC<Props> = memo((
  {
    query,
    onChangeOption,
    onChangeQuery,
    onChangeApplyQuery,
  },
) => {
  const handleClearQuery = () => onChangeQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={({ target }) => {
              switch (target.value) {
                case 'all':
                  onChangeOption(FilterBy.all);
                  break;
                case 'active':
                  onChangeOption(FilterBy.active);
                  break;
                case 'completed':
                  onChangeOption(FilterBy.completed);
                  break;
                default:
              }
            }}
          >
            <option value="all">
              All
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
              Completed
            </option>
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
            onChangeApplyQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
});
