/* eslint-disable prettier/prettier */

type Props = {
  statusFilter: 'all' | 'active' | 'completed';
  searchQuery: string;
  onChangeStatus: (status: 'all' | 'active' | 'completed') => void;
  onSearch: (query: string) => void;
};
export const TodoFilter: React.FC<Props> = ({
  statusFilter,
  searchQuery,
  onChangeStatus = () => {},
  onSearch = () => {},
}) => {

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as 'all' | 'active' | 'completed';
    onChangeStatus(value);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSearch(value);
  };

  const cleanSearch = () => onSearch('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={statusFilter}
            data-cy="statusSelect"
            onChange={handleStatus}
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={cleanSearch}
            />
        </span>
      </p>
    </form>
  );
};
