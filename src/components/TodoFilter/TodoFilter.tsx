import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { ITodoFilter } from '../../types/Todo';
import {
  DEFAULT_FILTER_STATE,
  TODO_FILTER_OPTIONS,
} from '../../constants/TodoFilter';
import { FilterStatuses } from '../../utils/enums/FiltersStatus';

interface IProps {
  todosFilter: ITodoFilter;
  setTodosFilter: Dispatch<SetStateAction<ITodoFilter>>;
}

export const TodoFilter: FC<IProps> = ({ setTodosFilter, todosFilter }) => {
  const { filter, status } = todosFilter;

  const handleChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setTodosFilter(prevState => ({
      ...prevState,
      filter: event.target.value.toLowerCase().trim(),
    }));
  };

  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    setTodosFilter(prevState => ({
      ...prevState,
      status: event.target.value as FilterStatuses,
    }));
  };

  const handleClearFilter = () => setTodosFilter(DEFAULT_FILTER_STATE);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleChangeStatus}
          >
            {TODO_FILTER_OPTIONS.map(({ value, title, id }) => (
              <option value={value} key={id}>
                {title}
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
          value={filter}
          onChange={handleChangeFilter}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {filter && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearFilter}
            />
          </span>
        )}
      </p>
    </form>
  );
};
