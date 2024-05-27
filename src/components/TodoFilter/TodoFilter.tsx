import React, { useState } from "react";
// import { Todo } from "../../types/Todo";

// interface Props {
//   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
// };

export const TodoFilter: React.FC = () => {
  const [value, setValue] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    // setTodos(currentTodos => currentTodos.filter(todo => todo.title === value));
  };

  function handleClick() {
    setValue('');
  };

  // function handleFilter() {
  // };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect">
            <option 
              value="all"
              // onClick={}
            >
              All
            </option>

            <option 
              value="active"
              // onClick={}
            >
              Active
            </option>

            <option 
              value="completed"
              // onChange={handleFilter}
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {value && (
            <button 
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClick}
            />
          )}
        </span>
      </p>
    </form>
  )
};
