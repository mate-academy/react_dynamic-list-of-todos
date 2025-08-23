import { Filter } from '../../App';

type Props = {
  selectFilter: (filter: Filter) => void;
  input: string;
  setInputValue: (input: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectFilter,
  input,
  setInputValue,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={e => selectFilter(e.target.value as Filter)}
        >
          <option value={Filter.All}>All</option>
          <option value={Filter.Active}>Active</option>
          <option value={Filter.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={input}
        onChange={e => setInputValue(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {input && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              setInputValue('');
            }}
          />
        )}
      </span>
    </p>
  </form>
);
