import { CompletedStatus } from '../../types/CompletedStatus';

type Props = {
  onStatusSelect: (completedStatus: CompletedStatus) => void;
  onTitleChange: (titleQuery: string) => void;
  titleQuery: string;
};

export const TodoFilter: React.FC<Props> = ({
  onStatusSelect,
  onTitleChange,
  titleQuery,
}) => {
  const { ALL, ACTIVE, COMPLETED } = CompletedStatus;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event =>
              onStatusSelect(event.target.value as CompletedStatus)
            }
          >
            <option value={ALL}>All</option>
            <option value={ACTIVE}>Active</option>
            <option value={COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={titleQuery}
          onChange={event => onTitleChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {titleQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onTitleChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
