import { Sorted } from '../../types/Sorted';

type Props = {
  query: string,
  setQueryHandler: (query: string) => void,
  setSortedHandler: (query: Sorted) => void,
};

export const TodoFilter:React.FC<Props> = ({
  query, setQueryHandler, setSortedHandler,
}) => {
  const sortedHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'active':
        setSortedHandler(Sorted.Active);
        break;
      case 'completed':
        setSortedHandler(Sorted.Completed);
        break;
      default:
        setSortedHandler(Sorted.All);
    }
  };

  const handlerChangeFilterQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryHandler(e.target.value);
  };

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={sortedHandler}>
            <option value={Sorted.All}>All</option>
            <option value={Sorted.Active}>Active</option>
            <option value={Sorted.Completed}>Completed</option>
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
          onChange={handlerChangeFilterQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQueryHandler('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
