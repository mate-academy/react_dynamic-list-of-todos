import { Filter } from '../../App';

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export const TodoFilter: React.FC<Props> = ({ setFilter, setValue, value }) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => setFilter(e.target.value as Filter)}
          >
            {Object.values(Filter).map(val => (
              <option key={val} value={val}>
                {val}
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
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
