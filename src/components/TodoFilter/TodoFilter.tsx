import { useEffect, useRef, useState } from 'react';

enum SortType {
  ALL = 'all',
  BY_ACTIVE = 'active',
  BY_COMPLETE = 'completed',
}

type Props = {
  status: SortType;
  handleChangeStatus: (newSortType: SortType) => void;
  onChangeQuery: (newQuery: string) => void;
};

export const TodoFilter = ({
  status,
  handleChangeStatus,
  onChangeQuery,
}: Props) => {
  const [inputQuery, setInputQuery] = useState('');
  const timerId = useRef<number | null>(null);

  const reset = () => {
    setInputQuery('');
    onChangeQuery('');
  };

  useEffect(() => {
    if (timerId.current !== null) {
      window.clearTimeout(timerId.current);
    }

    timerId.current = window.setTimeout(() => {
      onChangeQuery(inputQuery);
      timerId.current = null;
    }, 500);

    return () => {
      if (timerId.current !== null) {
        window.clearTimeout(timerId.current);
      }
    };
  }, [inputQuery, onChangeQuery]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => handleChangeStatus(e.target.value as SortType)}
          >
            <option value={SortType.ALL}>All</option>
            <option value={SortType.BY_ACTIVE}>Active</option>
            <option value={SortType.BY_COMPLETE}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputQuery && (
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
