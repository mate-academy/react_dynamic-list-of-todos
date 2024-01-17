import { SelectOptions } from '../../types/SelectOptions';

type Props = {
  query: string;
  setQuery: (text: string) => void;
  setSelect: (option: SelectOptions) => void;
};

export const TodoFilter: React.FC<Props> = ({ query, setQuery, setSelect }) => {
  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelect(e.target.value as SelectOptions);
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
            {Object.values(SelectOptions).map((key) => (
              <option value={key} key={key}>
                {key}
              </option>
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
          value={query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
