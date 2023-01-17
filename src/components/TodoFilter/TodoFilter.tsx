import { useRef } from 'react';

type Props = {
  setQuery: (query: string) => void,
  setSelectedFilter: (filter: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  setQuery,
  setSelectedFilter,
}) => {
  const inputField = useRef<HTMLInputElement>(null);

  const resetInput = () => {
    if (inputField.current !== null) {
      inputField.current.value = '';
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          ref={inputField}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputField.current?.value !== '' ? (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                resetInput();
                setQuery('');
              }}
            />
          ) : ''}
        </span>
      </p>
    </form>
  );
};
