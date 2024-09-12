import { Options } from '../../types/Options';

type Props = {
  searchTodos: string;
  setSearchTodos: (value: string) => void;
  filterValues: string;
  setFilterValues: (value: string) => void;
};

const options: Options[] = [
  { id: 0, value: 'all', title: 'All' },
  { id: 1, value: 'active', title: 'Active' },
  { id: 2, value: 'completed', title: 'Completed' },
];

export const TodoFilter: React.FC<Props> = ({
  searchTodos,
  setSearchTodos,
  filterValues,
  setFilterValues,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterValues}
            onChange={e => setFilterValues(e.target.value)}
          >
            {options.map(option => {
              const { id, value, title } = option;

              return (
                <option key={id} value={value}>
                  {title}
                </option>
              );
            })}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchTodos}
          onChange={e => setSearchTodos(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchTodos && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchTodos('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
