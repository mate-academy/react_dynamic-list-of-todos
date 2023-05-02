import { SetStateAction } from 'react';

interface Props {
  setFilterTodoBy: React.Dispatch<React.SetStateAction<string>>,
  filterTodoBy: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  searchQuery: string,
}

export const TodoFilter: React.FC<Props> = ({
  setFilterTodoBy, filterTodoBy, setSearchQuery, searchQuery,
}) => {
  const handleColorChange
  = (event: { target: { value: SetStateAction<string>; }; }) => {
    setFilterTodoBy(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterTodoBy}
            onChange={handleColorChange}
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
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.currentTarget.value);
            setFilterTodoBy('byQuery');
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
            onClick={() => setSearchQuery('')}
          />
        </span>
      </p>
    </form>
  );
};
