import { Status } from '../../types/status';

type Props = {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  setStatus,
  searchQuery,
  setSearchQuery,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as Status);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearInput = () => {
    setSearchQuery('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          onChange={handleInputChange}
          value={searchQuery}
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
              onClick={handleClearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
