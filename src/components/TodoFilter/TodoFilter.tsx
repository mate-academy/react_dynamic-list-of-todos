import { FC } from 'react';

interface Props {
  todoStatusSelect: string,
  searchQuery: string,
  onStatusSelect: (status: string) => void,
  onInputChange: (query: string) => void
}

export const TodoFilter: FC<Props> = (props) => {
  const {
    todoStatusSelect,
    searchQuery,
    onStatusSelect,
    onInputChange,
  } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={todoStatusSelect}
            onChange={(event) => onStatusSelect(event.target.value)}
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
          onChange={(event) => onInputChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchQuery !== ''
            && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => onInputChange('')}
              />
            )}
        </span>
      </p>
    </form>
  );
};
