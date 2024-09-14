import { FC } from 'react';
import { Select } from '../../App';

type TodoFilterProps = {
  selectValue: string;
  setSelectValue: (value: string) => void;
  inputValue: string;
  setInputValue: (searchValue: string) => void;
};

export const TodoFilter: FC<TodoFilterProps> = ({
  setInputValue,
  inputValue,
  selectValue,
  setSelectValue,
}) => {
  const handleChangeSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCloseButton = () => {
    setInputValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={handleChangeSelectValue}
          >
            <option value={Select.all}>All</option>
            <option value={Select.active}>Active</option>
            <option value={Select.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputValue}
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCloseButton}
            />
          )}
        </span>
      </p>
    </form>
  );
};
