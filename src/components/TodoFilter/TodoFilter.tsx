import { useEffect, useState } from 'react';
import { FinishQuery, Query } from '../../types/Query';

type Props = {
  handleFiltrationQueries: (query: Query) => void;
};

export const TodoFilter: React.FC<Props> = ({ handleFiltrationQueries }) => {
  const [finishQuery, setFinishQuery] = useState(FinishQuery.All);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    handleFiltrationQueries({ finishQuery, searchQuery });
  }, [finishQuery, searchQuery, handleFiltrationQueries]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={finishQuery}
            onChange={event => {
              setFinishQuery(event.target.value as FinishQuery);
            }}
          >
            <option value={FinishQuery.All}>All</option>
            <option value={FinishQuery.Active}>Active</option>
            <option value={FinishQuery.Completed}>Completed</option>
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
          onChange={event => {
            setSearchQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setFinishQuery(FinishQuery.All);
                setSearchQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
