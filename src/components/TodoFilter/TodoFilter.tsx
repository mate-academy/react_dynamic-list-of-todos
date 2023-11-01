import React, { useState, useCallback } from 'react';
import { getTodos, getFilteredTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { Selected } from '../../types/Enum';

type Props = {
  setTodos: (value: Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = ({
  setTodos,
}) => {
  const [selectedOption, setSelectedOption] = useState('all');
  const [value, setValue] = useState('');

  const getIncludesTodos = useCallback(
    (val: string, currTodos: Todo[]) => {
      return currTodos.filter((todo) => todo.title
        .toLowerCase()
        .includes(val));
    },
    [],
  );

  const handleFilterChange = useCallback(
    async (selectedValue: string, inputValue: string) => {
      setSelectedOption(selectedValue);

      let filteredTodos = await getTodos();

      switch (selectedValue) {
        case Selected.All:
          break;
        case Selected.Active:
          filteredTodos = await getFilteredTodos(false);
          break;
        case Selected.Completed:
          filteredTodos = await getFilteredTodos(true);
          break;
        default:
          break;
      }

      if (inputValue) {
        filteredTodos = getIncludesTodos(inputValue, filteredTodos);
      }

      setTodos(filteredTodos);
    },
    [getIncludesTodos, setTodos],
  );

  const handleInputChange = useCallback((event: React
    .ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    const preparedInputValue = searchValue
      .toLowerCase()
      .trim();

    setValue(searchValue);
    handleFilterChange(selectedOption, preparedInputValue);
  }, [selectedOption, handleFilterChange]);

  const handleSelectChange = useCallback(async (event: React
    .ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    handleFilterChange(selectedValue, value);
  }, [value, handleFilterChange]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={handleSelectChange}
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
          value={value}
          className="input"
          placeholder="Search..."
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable jsx-a11y/control-has-associated-label */}
          {value && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={async () => {
                setValue('');
                handleFilterChange(selectedOption, '');
              }}
            />
          )}

        </span>
      </p>
    </form>
  );
};
