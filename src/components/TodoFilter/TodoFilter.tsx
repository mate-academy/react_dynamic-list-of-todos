import React, { useEffect, useState } from 'react';
import { Select } from '../../types/Select';
import { Todo } from '../../types/Todo';

type Props = {
  list: Todo[],
  handleChanges(changedList: Todo[] | []): void,
};

export const TodoFilter: React.FC<Props> = ({
  list,
  handleChanges,
}) => {
  const [selected, setSelected] = useState(Select.all);
  const [query, setQuery] = useState('');
  const [resetIsClicked, setResetIsClicked] = useState(false);

  const selectedList = () => {
    switch (selected) {
      case Select.active:
        return list.filter(todo => todo.completed === false);
      case Select.completed:
        return list.filter(todo => todo.completed === true);
      default:
        return list;
    }
  };

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement>
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelected(value as Select);
  };

  const modifiedList = selectedList().filter(todos => {
    return todos.title.toUpperCase().includes(query.toUpperCase());
  });

  useEffect(() => {
    handleChanges(modifiedList);
  }, [query, selected]);

  const eraseInput = () => {
    setResetIsClicked(false);
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selected}
            onChange={handleSelect}
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
          value={query}
          onChange={event => {
            setQuery(event.target.value);
            setResetIsClicked(true);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {resetIsClicked
        && query
        && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={eraseInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
