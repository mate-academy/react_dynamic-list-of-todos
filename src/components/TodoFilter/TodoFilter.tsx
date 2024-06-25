import React, { Dispatch, SetStateAction } from 'react';
import { TodoStatus } from '../../types/TodoStatus'; // Import the TodoStatus enum

interface Props {
  selectedOption: TodoStatus;
  setSelectedOption: Dispatch<SetStateAction<TodoStatus>>;
  setTitle: Dispatch<SetStateAction<string>>;
  title: string;
}

export const TodoFilter: React.FC<Props> = ({
  selectedOption,
  setSelectedOption,
  setTitle,
  title,
}) => {
  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedOption(value as TodoStatus);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={handleValueChange}
          >
            <option value={TodoStatus.All}>All</option>
            <option value={TodoStatus.Active}>Active</option>
            <option value={TodoStatus.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={title}
          onChange={handleTitleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {title && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setTitle('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
