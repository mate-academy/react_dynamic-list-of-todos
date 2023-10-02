import { useRef } from 'react';
import { FilteringQuery } from '../../types/FilteringQuery';

type Props = {
  onSelectFiltering: (filterBy: FilteringQuery) => void,
  onSearching: (searchBy: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  onSelectFiltering,
  onSearching,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              onSelectFiltering(event.target.value as FilteringQuery);
            }}
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
          onChange={(event) => onSearching(event.target.value)}
          ref={inputRef}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputRef.current && inputRef.current.value.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = '';
                }

                onSearching('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
