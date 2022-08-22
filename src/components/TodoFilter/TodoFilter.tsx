import { SetStateAction, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  setFiltredTodos: (todo:Todo[]) => void,
}

const filtredByComleted = (nameFilter: string, todosList: Todo[]): Todo[] => {
  switch (nameFilter) {
    case 'completed':
      return todosList.filter(todo => todo.completed === true);

    case 'active':
      return todosList.filter(todo => todo.completed === false);

    case 'all':
      return todosList;

    default:
      return todosList;
  }
};

const filredByQuery = (searchQury: string, todosList: Todo[]): Todo[] => {
  if (searchQury === '') {
    return todosList;
  }

  return (todosList
    .filter(
      todo => todo.title.toLowerCase().includes(searchQury.toLowerCase()),
    ));
};

export const TodoFilter: React.FC<Props> = (props) => {
  const { setFiltredTodos, todos } = props;

  const [selectFilter, setSelectFilter] = useState('all');
  const [query, setQuery] = useState('');

  const handelSelectFiter = (
    event: { target: { value: SetStateAction<string>; }; },
  ) => {
    window.console.dir(event.target.value);
    setSelectFilter(event.target.value);
  };

  const debounced = useDebouncedCallback(
    (value: Todo[]) => {
      setFiltredTodos(value);
    },
    1000,
  );

  useEffect(() => {
    const filteredBySelect = filtredByComleted(selectFilter, todos);
    const filteredByQuery = filredByQuery(query, filteredBySelect);

    debounced(filteredByQuery);
  }, [selectFilter, query]);

  const handelSearchQuery = (
    event: { target: { value: SetStateAction<string>; }; },
  ) => {
    setQuery(event.target.value);
  };

  const handelCloseSearch = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectFilter}
            onChange={handelSelectFiter}
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
          value={query}
          onChange={handelSearchQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query
          && (
            <button
              data-cy="clearSearchButton"
              aria-label="Mute volume"
              type="button"
              className="delete"
              onClick={handelCloseSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
