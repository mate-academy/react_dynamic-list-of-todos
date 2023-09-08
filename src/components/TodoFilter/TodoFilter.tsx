import { ChangeEvent, useState } from 'react';
import { FilterMode } from '../../types/FilterMode';

type TodoFilterProps = {
  getTodos: (mode: FilterMode, query: string) => void
};

export const TodoFilter = ({ getTodos }: TodoFilterProps) => {
  const [filterMode, setFilterMode] = useState(FilterMode.all);
  const [query, setQuery] = useState('');

  const onChangeFilterOption = (event: ChangeEvent<HTMLSelectElement>) => {
    let mode;

    switch (event.target.value) {
      default:
      case 'all':
        mode = FilterMode.all;
        break;
      case 'active':
        mode = FilterMode.active;
        break;
      case 'completed':
        mode = FilterMode.completed;
    }

    setFilterMode(mode);
    getTodos(mode, query);
  };

  const onChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const inputQuery = event.target.value;

    setQuery(inputQuery);
    getTodos(filterMode, inputQuery);
  };

  const onResetQuery = () => {
    const input
      = document.getElementsByClassName('input')[0] as HTMLInputElement;

    input.value = '';
    setQuery('');
    getTodos(filterMode, '');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={onChangeFilterOption}>
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
          onChange={onChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== '' && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onResetQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
