import { FC } from 'react';
import { TypeOfFilter } from '../../types/typeOfFilter';

interface Props {
  querry: string;
  setQuerry: (value: string) => void;
  setTypeFilter: (value: TypeOfFilter) => void;
}

export const TodoFilter: FC<Props> = (props) => {
  const { querry, setQuerry, setTypeFilter } = props;

  const reset = () => {
    setQuerry('');
    setTypeFilter(TypeOfFilter.All);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => (
              setTypeFilter(event.target.value as TypeOfFilter)
            )}
          >
            <option value={TypeOfFilter.All}>All</option>
            <option value={TypeOfFilter.Active}>Active</option>
            <option value={TypeOfFilter.Complited}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={querry}
          onChange={(event) => setQuerry(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>

          {querry && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
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
