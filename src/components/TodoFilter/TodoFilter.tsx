import { useEffect, useState } from 'react';

interface MyComponentProps {
  actualFilters: string;
  setActualFilters: React.Dispatch<React.SetStateAction<string>>;
  setFilterQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const TodoFilter: React.FC<MyComponentProps> = ({
  actualFilters,
  setActualFilters,
  setFilterQuery,
}) => {
  const [searchParam, setSearchParam] = useState<string>('');

  useEffect(() => {
    const seekParam = searchParam.trim() === '' ? searchParam : searchParam;

    setFilterQuery(seekParam.toLowerCase());
  }, [searchParam, setFilterQuery]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={actualFilters}
            onChange={event => {
              setActualFilters(event.target.value);
            }}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={searchParam}
          onChange={event => {
            setSearchParam(event.target.value);
          }}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchParam && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearchParam('');
                setFilterQuery('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
