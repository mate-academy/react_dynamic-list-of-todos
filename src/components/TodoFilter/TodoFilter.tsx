import { FC, useState } from 'react';

type Props = {
  filterTodos: (value: string, search: string) => void,
};

export const TodoFilter: FC<Props> = ({ filterTodos }) => {
  const [valueInput, setValueInput] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  const hendlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterTodos(selectValue, event.currentTarget.value);
    setValueInput(event.currentTarget.value);
  };

  const hendlerSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    filterTodos(event.currentTarget.value, valueInput);
    setSelectValue(event.currentTarget.value);
  };

  const resetInput = () => {
    setValueInput('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={hendlerSelect}
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
          onChange={hendlerInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {valueInput === '' || (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
