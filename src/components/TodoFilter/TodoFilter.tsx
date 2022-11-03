import { FC } from 'react';

interface Prop {
  searchField: string;
  setSearchField: (searchField : string) => void;
  setFilteringMethod: (value: string) => void;
}

export const TodoFilter: FC<Prop> = ({
  searchField,
  setSearchField,
  setFilteringMethod,
}) => {
  const resetSearchField = () => {
    setSearchField('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => setFilteringMethod(e.target.value)}
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
          className="input"
          type="text"
          value={searchField}
          onChange={event => setSearchField(event.target.value)}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchField
        && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetSearchField}
            />
          </span>
        )}
      </p>
    </form>
  );
};
