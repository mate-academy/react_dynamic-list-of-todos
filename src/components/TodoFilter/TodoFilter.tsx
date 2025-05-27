import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

enum SelectTodos {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const filterStrategies: Record<SelectTodos, (todo: Todo) => boolean> = {
  [SelectTodos.All]: () => true,
  [SelectTodos.Active]: (todo) => !todo.completed,
  [SelectTodos.Completed]: (todo) => todo.completed,
};

type Props = {
  todos: Todo[];
  changeTodoList: (filteredTodos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, changeTodoList }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedValue, setSelectedValue] = useState<SelectTodos>(
    SelectTodos.All,
  );

  useEffect(() => {
    const strategy = filterStrategies[selectedValue];

    const filteredTodos = todos
      .filter(strategy)
      .filter(({ title }) =>
        searchValue.trim()
          ? title.toLowerCase().includes(searchValue.toLowerCase())
          : true,
      );

    changeTodoList(filteredTodos);
  }, [selectedValue, searchValue, todos, changeTodoList]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedValue}
            onChange={event =>
              setSelectedValue(event.target.value as SelectTodos)
            }
          >
            {Object.entries(SelectTodos).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
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
          value={searchValue}
          placeholder="Search..."
          onChange={event => setSearchValue(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
