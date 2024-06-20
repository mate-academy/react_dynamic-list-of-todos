import { Dispatch, SetStateAction } from 'react';

// Define an enum for the statuses
enum TodoStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

// Create an array of options based on the enum values
const todoStatusOptions = [
  { value: TodoStatus.All, label: 'All' },
  { value: TodoStatus.Active, label: 'Active' },
  { value: TodoStatus.Completed, label: 'Completed' },
];

interface Props {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
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

    setSelectedOption(value);
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
            {todoStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
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
