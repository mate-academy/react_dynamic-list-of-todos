import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

enum FilterOption {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const dropList = [
  { value: FilterOption.All, label: 'All' },
  { value: FilterOption.Active, label: 'Active' },
  { value: FilterOption.Completed, label: 'Completed' },
];

type Props = {
  todos: Todo[];
  setFilter: (filter: Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = ({ todos, setFilter }) => {
  const [searchInput, setSearchInput] = useState('');
  const [option, setOption] = useState(FilterOption.All);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setSearchInput(inputValue);
  };

  useEffect(() => {
    const filterTodos = () => {
      return todos.filter((todo) => todo.title.toLowerCase()
        .includes(searchInput.trim().toLowerCase()));
    };

    switch (option) {
      case FilterOption.Active:
        setFilter(filterTodos().filter((todo) => !todo.completed));
        break;

      case FilterOption.Completed:
        setFilter(filterTodos().filter((todo) => todo.completed));
        break;

      default:
        setFilter(filterTodos());
        break;
    }
  }, [searchInput, todos, setFilter, option]);

  const reset = () => {
    setSearchInput('');
    setOption(FilterOption.All);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => setOption(e.target.value as FilterOption)}
          >
            {dropList.map(optionList => (
              <option value={optionList.value}>{optionList.label}</option>
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
          value={searchInput}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchInput && (
          /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          )}

        </span>
      </p>
    </form>
  );
};
