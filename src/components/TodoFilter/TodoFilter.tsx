interface Props {
  select: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  search: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  clearSearch: () => void,
}

export const TodoFilter: React.FC<Props> = ({
  select,
  search,
  value,
  clearSearch,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={select}>
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
          value={value}
          onChange={search}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value.length > 0
         && (
           <span className="icon is-right" style={{ pointerEvents: 'all' }}>
             {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
             <button
               data-cy="clearSearchButton"
               type="button"
               className="delete"
               onClick={clearSearch}
             />
           </span>
         )}
      </p>
    </form>
  );
};
