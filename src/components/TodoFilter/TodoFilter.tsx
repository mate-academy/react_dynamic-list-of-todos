import { Status } from '../../App';

type Props = {
  status: string;
  input: string;
  onChangeStatus: (value: Status) => void;
  onChangeInput: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  input,
  onChangeStatus,
  onChangeInput,
}) => {
  const handleReset = () => {
    onChangeInput('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => onChangeStatus(e.target.value)}
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
          value={input}
          onChange={e => onChangeInput(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {input !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
