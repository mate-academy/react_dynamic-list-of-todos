import { ChangeEvent } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  value: string;
  setFilterValue: (arg: string) => void;
  text: string;
  setFilterText: (arg: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  value,
  setFilterValue,
  text,
  setFilterText,
}) => {
  const handleValueChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(event.currentTarget.value);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.currentTarget.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={value}
            onChange={handleValueChange}
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
          value={text}
          onChange={handleTextChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {text !== '' && (
            <>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setFilterText('')}
                aria-label="Clear search"
              />
            </>
          )}
        </span>
      </p>
    </form>
  );
};
