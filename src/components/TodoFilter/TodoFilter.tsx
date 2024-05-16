import {Todo} from "../../types/Todo";
import React, {useState} from "react";

interface Props {
  allTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export const TodoFilter: React.FC<Props> = ({ allTodos, setTodos}) => {
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('all');
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.target.value);
    filter(event.target.value, search);
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    filter(select, event.target.value);
  }

  const handleClear = () => {
    setSearch('');
    filter(select, '');
  }

  function filter(selectType: string = select, input: string = search) {
    const searchedTodos = allTodos.filter(todo => todo.title.toLowerCase().includes(input.toLowerCase()));

    if (selectType === 'all') {
      setTodos(searchedTodos);
    } else if (selectType === 'active') {
      const newTodos = searchedTodos.filter(todo => !todo.completed);
      setTodos(newTodos);
    } else if (selectType === 'completed') {
      const newTodos = searchedTodos.filter(todo => todo.completed);
      setTodos(newTodos);
    }
  }

  return (
    <form className="field has-addons">
      <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
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
          className="input"
          placeholder="Search..."
          value={search}
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass"/>
        </span>

        {search && (
          <span className="icon is-right" style={{pointerEvents: 'all'}}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
        </span>
        )}
      </p>
    </form>
  );
}
