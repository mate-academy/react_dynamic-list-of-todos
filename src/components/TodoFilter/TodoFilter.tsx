import { Status } from '../../types/Filtered';

type Props = {
  title: string,
  handleChangeInput: (value: React.ChangeEvent<HTMLInputElement>) => void;
  setTitle: (value: string) => void;
  setFilteredStatus: (status: Status) => void;
};
export const TodoFilter: React.FC<Props> = ({
  title,
  handleChangeInput,
  setTitle,
  setFilteredStatus,
}) => {
  const handleReset = () => {
    setTitle('');
  };

  const handleFilterChange = (filter: Status) => {
    setFilteredStatus(filter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect">
            <option
              value="all"
              onClick={() => handleFilterChange(Status.All)}
            >
              All
            </option>
            <option
              value="all"
              onClick={() => handleFilterChange(Status.Active)}
            >
              Active
            </option>
            <option
              value="all"
              onClick={() => handleFilterChange(Status.Completed)}
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={handleChangeInput}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={title}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            onClick={() => handleReset()}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
