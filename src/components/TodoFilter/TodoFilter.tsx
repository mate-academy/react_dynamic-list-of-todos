import {
  FC,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  query: string,
  setQuery: Dispatch<SetStateAction<string>>,
  setTodoStatus: Dispatch<SetStateAction<TodoStatus>>,
};

export const TodoFilter: FC<Props> = ({
  query,
  setQuery,
  setTodoStatus,
}) => {
  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'all':
        setTodoStatus(TodoStatus.ALL);
        break;
      case 'active':
        setTodoStatus(TodoStatus.ACTIVE);
        break;
      case 'completed':
        setTodoStatus(TodoStatus.COMPLETED);
        break;
      default:
        setTodoStatus(TodoStatus.ALL);
        break;
    }
  };

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const resetQuery = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChangeStatus}
          >
            {Object.values(TodoStatus).map((enumValue) => (
              <option
                key={enumValue}
                value={enumValue}
              >
                {enumValue.slice(0, 1).toUpperCase() + enumValue.slice(1)}
              </option>
            ))}
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQuery}
              aria-label="clear search"
            />
          </span>
        )}
      </p>
    </form>
  );
};
