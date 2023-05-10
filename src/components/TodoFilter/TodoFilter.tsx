import { FC } from 'react';

interface Props {
  searchedTodo: string;
  setSearchedTodo: (value: string) => void;
  selectedStatusOfTodo: string;
  setSelectedStatusOfTodo: (value: string) => void;
}

export const TodoFilter: FC<Props> = ({
  searchedTodo,
  setSearchedTodo,
  selectedStatusOfTodo,
  setSelectedStatusOfTodo,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatusOfTodo}
            onChange={(event) => setSelectedStatusOfTodo(event.target.value)}
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
          value={searchedTodo}
          onChange={(event) => setSearchedTodo(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchedTodo !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchedTodo('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
