import { ProgressStatus } from '../../types/ProgressEnum';
import './TodoFilter.scss';

interface Props {
  searchQuery: string,
  setSearchQuery: (searchValue: string) => void,
  progress: ProgressStatus,
  setProgress: (value: ProgressStatus) => void;
}

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    searchQuery,
    setSearchQuery,
    progress,
    setProgress,
  } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={progress}
            onChange={(event) => setProgress(
              event.target.value as ProgressStatus,
            )}
          >
            <option value={ProgressStatus.All}>All</option>
            <option value={ProgressStatus.Active}>Active</option>
            <option value={ProgressStatus.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          id="searchInput"
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right pointer-all">
          {searchQuery
          && (
            <button
              aria-labelledby="button-label"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
