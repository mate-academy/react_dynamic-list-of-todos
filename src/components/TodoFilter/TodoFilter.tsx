import React, { useRef, useState } from 'react';

type Props = {
  onFilterValueChange: (input: string) => void,
  onSelectedOptionTodo: (optionValue: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  onFilterValueChange,
  onSelectedOptionTodo,
}) => {
  const [clearSearchBtn, setClearSearchBtn] = useState(false);

  const inputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    onFilterValueChange(event.currentTarget.value);
    setClearSearchBtn(event.currentTarget.value.length > 0);
  };

  const ref = useRef<HTMLInputElement>(null);

  const onClearInput = () => {
    if (ref.current !== null) {
      ref.current.value = '';
    }

    onFilterValueChange('');
    setClearSearchBtn(false);
  };

  const selectedOptionTodo = (event: React.FormEvent<HTMLSelectElement>) => {
    onSelectedOptionTodo(event.currentTarget.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={selectedOptionTodo}>
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
          onChange={inputChangeHandler}
          ref={ref}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {clearSearchBtn ? (
            <button
              data-cy="clearSearchButton"
              aria-label="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearInput}
            />
          ) : null}
        </span>
      </p>
    </form>
  );
};
