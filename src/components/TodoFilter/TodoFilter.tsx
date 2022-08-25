import { FC } from 'react';
import { OptionForFilterTodos } from '../../types/OptionForFilterTodos';

interface Props {
  optionForFilter: OptionForFilterTodos,
  setOptionForFilter: (optionForFilter: OptionForFilterTodos) => void,
  searchQuery: string,
  setSearchQuery: (query: string) => void,
}

export const TodoFilter: FC<Props> = (props) => {
  const {
    optionForFilter,
    setOptionForFilter,
    searchQuery,
    setSearchQuery,
  } = props;

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={optionForFilter}
            onChange={((event) => setOptionForFilter(
              event.target.value as OptionForFilterTodos,
            ))}
          >
            <option value={OptionForFilterTodos.All}>All</option>
            <option value={OptionForFilterTodos.Active}>Active</option>
            <option value={OptionForFilterTodos.Completed}>Completed</option>
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
            setSearchQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearchQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
