import { FC, useState } from 'react';

type TodoFilterProps = {
  filtered: (value: string) => void;
  setInputValue: (searchValue: string) => void;
};

export const TodoFilter: FC<TodoFilterProps> = ({
  filtered,
  setInputValue,
}) => {
  const [valueSelect, setValueSelect] = useState('all');
  const [valueInput, setValueInput] = useState('');

  const handleChangeSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueSelect(e.target.value);
    filtered(e.target.value);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
    setInputValue(event.target.value);
  };

  const handleCloseButton = () => {
    setValueInput('');
    setInputValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={valueSelect}
            onChange={handleChangeSelectValue}
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
          value={valueInput}
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {valueInput && (
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
