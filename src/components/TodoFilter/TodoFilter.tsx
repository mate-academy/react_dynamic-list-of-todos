import { ChangeEvent } from 'react';

interface Props {
  input: string,
  filterForQuery: (select: string) => void,
  query: (input: string) => void,
}

export const TodoFilter: React.FC<Props> = ({
  input,
  filterForQuery,
  query,
}) => {
  const handleOnChange = (
    saveTo: (event: string) => void,
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    saveTo(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              handleOnChange(filterForQuery, event);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
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
          value={input}
          onChange={(event) => {
            handleOnChange(query, event);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {input && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => query('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
