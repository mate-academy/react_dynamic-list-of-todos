type Props = {
  changeCompleted : () => void
  changeActive: () => void
  changeAll:() => void
  qwery: string
  findQwery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetQwery: () => void
};

export const TodoFilter : React.FC<Props> = ({
  changeCompleted,
  changeActive,
  changeAll,
  qwery,
  findQwery,
  resetQwery,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    switch (selectedValue) {
      case 'all':
        changeAll();
        break;
      case 'active':
        changeActive();
        break;
      case 'completed':
        changeCompleted();
        break;
      default:
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
          >
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
          value={qwery}
          onChange={findQwery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {qwery && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQwery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
