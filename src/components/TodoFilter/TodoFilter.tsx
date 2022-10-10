import { ChangeEvent } from 'react';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  value: FilterStatus,
  response: string
  setValue: (status: FilterStatus) => void,
  setResponse: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  value,
  response,
  setValue,
  setResponse,
}) => {
  const handleNewResponse = (search: ChangeEvent<HTMLInputElement>) => {
    setResponse(search.target.value);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSortType = event.target.value as FilterStatus;

    setValue(newSortType);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={value}
            onChange={handleSelect}
          >
            <option value={FilterStatus.ALL}>All</option>
            <option value={FilterStatus.ACTIVE}>Active</option>
            <option value={FilterStatus.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={response}
          onChange={handleNewResponse}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {
            response && (
              /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setResponse('')}
              />
            )
          }
        </span>
      </p>
    </form>
  );
};
