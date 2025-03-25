import { Dispatch, SetStateAction } from 'react';
import { DropdownOptions } from '../../App';

interface Props {
  setCompletionStatusFilter: Dispatch<SetStateAction<DropdownOptions>>;
  setInputQuery: (arg: string) => void;
  inputQuery: string;
  completionStatusFilter: DropdownOptions;
}

export const TodoFilter = ({
  setCompletionStatusFilter,
  setInputQuery,
  inputQuery,
  completionStatusFilter,
}: Props) => {
  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCompletionStatusFilter(event.target.value as DropdownOptions);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleDropdownChange}
            value={completionStatusFilter}
          >
            <option value={DropdownOptions.DEFAULT}>All</option>
            <option value={DropdownOptions.ACTIVE}>Active</option>
            <option value={DropdownOptions.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputQuery}
          onChange={event => setInputQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setInputQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
