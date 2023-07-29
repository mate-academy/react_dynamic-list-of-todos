import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setVisibleTodos: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(({
  todos, setVisibleTodos,
}) => {
  const [filter, setFilter] = useState('all');
  const [value, setValue] = useState('');

  const filterTodos = (fil: string, query: string) => {
    const currentTodos = query === '' ? todos : todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    switch (fil) {
      case 'all':
        setVisibleTodos(currentTodos);

        return;

      case 'active':
        setVisibleTodos(currentTodos.filter(todo => todo.completed === false));

        return;

      case 'completed':
        setVisibleTodos(currentTodos.filter(todo => todo.completed === true));

        return;

      default:
        setVisibleTodos(currentTodos);
    }
  };

  const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = event.target.value;

    setFilter(newFilter);
    filterTodos(newFilter, value);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setValue(newValue);
    filterTodos(filter, newValue);
  };

  const deleteValue = () => {
    setValue('');
    filterTodos(filter, '');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={e => e.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleChangeFilter}
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
          value={value}
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={deleteValue}
            />
          </span>
        )}
      </p>
    </form>
  );
});
