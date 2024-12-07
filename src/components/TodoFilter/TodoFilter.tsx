import { Todo } from '../../types/Todo';
import { useState, useEffect } from 'react';
import { Option } from '../Option';

interface Props {
  allTodos?: Todo[];
  setTodos: (value: Todo[]) => void;
}

type FilterType = 'all' | 'active' | 'completed';

export const TodoFilter: React.FC<Props> = ({ allTodos, setTodos }) => {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [close, setClose] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    if (allTodos) {
      let newTodos = [...allTodos];

      if (filter === 'active') {
        newTodos = allTodos?.filter(todo => !todo.completed);
      } else if (filter === 'completed') {
        newTodos = allTodos?.filter(todo => todo.completed);
      } else {
        newTodos = allTodos;
      }

      if (inputSearch.trim()) {
        newTodos = newTodos.filter(todo =>
          todo.title.toLowerCase().includes(inputSearch.toLowerCase()),
        );
      }

      setTodos(newTodos);
    }
  }, [inputSearch, allTodos, filter, setTodos]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
    setClose(!!event.target.value);
  };

  const handleCloseClick = () => {
    setInputSearch('');
    setClose(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as FilterType);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
            value={filter}
          >
            {['All', 'Active', 'Completed'].map(item => (
              <Option optionValue={item} key={item} />
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputSearch}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {close && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCloseClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
