import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import { Status } from '../../types/Status';

type Props = {
  setQuery: (text: string) => void,
  setApliedQuery: (text: string) => void,
  query: string,
  status: string,
  setStatus: (text: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  setApliedQuery,
  status,
  setStatus,
}) => {
  const applyQuery = useCallback(
    debounce(setApliedQuery, 1000),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleButtonClick = () => {
    setQuery('');
    setApliedQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {Object.values(Status).map(value => (
              <option value={value}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0 && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleButtonClick}
            />
          )}
        </span>
      </p>
    </form>
  );
};
