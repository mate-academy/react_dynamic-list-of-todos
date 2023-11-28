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
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredStatus(event.target.value as Status);
  };

  const validInput = title !== '';

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
            <option
              value={Status.All}
            >
              All
            </option>
            <option
              value={Status.Active}
            >
              Active
            </option>
            <option
              value={Status.Completed}
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

        {validInput && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => setTitle('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
