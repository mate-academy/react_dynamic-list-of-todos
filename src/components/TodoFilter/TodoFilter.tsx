import { ChangeEvent, useState } from 'react';
import { StatusTodo } from '../../types/StatusTodo';

type Props = {
  setSelectedStatus: (status: StatusTodo) => void;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setSelectedStatus,
  setQuery,
}: Props) => {
  const [selected, setSelected] = useState<StatusTodo>(StatusTodo.All);
  const [query, setSelectedQuery] = useState('');

  const handleOnChangeSelected = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value as StatusTodo);
    setSelectedStatus(event.target.value as StatusTodo);
  };

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
            value={selected}
            onChange={handleOnChangeSelected}
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
          value={query}
          onChange={handleOnChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
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
