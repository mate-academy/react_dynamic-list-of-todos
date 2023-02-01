import { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-duplicates
import { getActiveTodos, getCompletedTodos } from '../../api';
// eslint-disable-next-line import/no-duplicates
import { getSearchedTodos, getTodos } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  onFilter: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodoFilter:React.FC<Props> = ({ onFilter }) => {
  const [query, setQuery] = useState('');

  const customFilter = useCallback(async (input: string) => {
    if (input === 'completed') {
      const v = await getCompletedTodos();

      onFilter(v);
    }

    if (input === 'active') {
      const v = await getActiveTodos();

      onFilter(v);
    }
  }, []);

  const searchFilter = async (searchedLetters: string) => {
    const s = await getSearchedTodos(searchedLetters);

    onFilter(s);
    setQuery(searchedLetters);
  };

  useEffect(() => {
    getTodos().then(() => customFilter);
  });

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => customFilter(event.target.value)}
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
          onChange={(event) => searchFilter(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              searchFilter('');
              setQuery('');
            }}
          />
        </span>
      </p>
    </form>
  );
};
