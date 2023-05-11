import { ChangeEvent, FC, memo } from 'react';
import { CompletedStatus } from '../../types/CompletedStatus';

interface Props {
  onChangeInput: (event: ChangeEvent<HTMLInputElement> | string) => void;
  query: string;
  onClearInput: () => void;
  onSelectedStatus: (completedStatus: CompletedStatus) => void;
  selectedOption: string;
}

export const TodoFilter: FC<Props> = memo(({
  query,
  onChangeInput,
  onClearInput,
  onSelectedStatus,
  selectedOption,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={event => onSelectedStatus(
              event.target.value as CompletedStatus,
            )}
          >
            <option value={CompletedStatus.All}>All</option>
            <option value={CompletedStatus.Active}>
              Active
            </option>
            <option value={CompletedStatus.Completed}>
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={event => onChangeInput(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearInput}
            />
          </span>
        )}

      </p>
    </form>
  );
});
