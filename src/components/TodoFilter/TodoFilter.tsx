import { Dispatch, SetStateAction } from 'react';

type Props = {
  changeSortBy: Dispatch<SetStateAction<string>>;
  query: string;
  changeQuery: Dispatch<SetStateAction<string>>;
};

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    changeSortBy,
    query,
    changeQuery,
  } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={(event) => changeSortBy(event.target.value)}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option
              value="active"
            >
              Active
            </option>
            <option value="completed">Completed</option>
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
          onChange={(event) => changeQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => changeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
