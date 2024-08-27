import { ChangeEvent, useState } from 'react';
import { StatusTodo } from '../../types/StatusTodo';

type Props = {
  selectedStatus: StatusTodo;
  setSelectedStatus: (status: StatusTodo) => void;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectedStatus,
  setSelectedStatus,
  setQuery,
}: Props) => {
  const [query, setSelectedQuery] = useState('');
  const filterOptions = Object.entries(StatusTodo);
  const handleOnChangeSelected = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value as StatusTodo);
  };

  // eslint-disable-next-line no-console
  console.log(filterOptions);
  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedQuery(event.target.value);
    setQuery(event.target.value);
  };

  const reset = () => {
    setSelectedQuery('');
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={handleOnChangeSelected}
          >
            {filterOptions.map(option => {
              const optionKey = option[0];
              const optionValue = option[1];

              return (
                <option key={optionKey} value={optionValue}>
                  {optionKey}
                </option>
              );
            })}
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
          onChange={handleOnChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right">
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
