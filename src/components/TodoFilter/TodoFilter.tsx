import { useCallback, useState } from 'react';
import { Category } from '../../types/Category';

// DEBOUNCE DECORATOR:
const debounce = (func: (qwery: string) => void, wait: number) => {
  let timer: NodeJS.Timeout;

  return (newQwery: string) => {
    clearTimeout(timer);

    timer = setTimeout(func, wait, newQwery);
  };
};

type Props = {
  setCategory: (category: Category) => void,
  setQwery: (qwery: string) => void,
  qwery: string,
};

export const TodoFilter: React.FC<Props> = ({
  setCategory,
  setQwery,
  qwery,
}) => {
  const [currentQwery, setCurrentQwery] = useState('');

  const setQweryDebounce = useCallback(
    debounce(setQwery, 700),
    [],
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              setCategory(event.target.value as Category);
            }}
          >
            <option value={Category.ALL}>All</option>
            <option value={Category.ACTIVE}>Active</option>
            <option value={Category.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={currentQwery}
          onChange={(event) => {
            setCurrentQwery(event.target.value);
            setQweryDebounce(event.target.value);
          }}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {qwery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setQwery('');
                setCurrentQwery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
