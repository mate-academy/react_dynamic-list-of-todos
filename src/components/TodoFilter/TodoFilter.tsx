import { TodosType } from '../../types/TodosType';

type Props = {
  query: string;
  onChangeQuery: (value: string) => void;
  onChangeTypeOfLoad: (value: TodosType) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  onChangeTypeOfLoad,
}) => {
  const handleChangeOnSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    switch (event.target.value) {
      case TodosType.All:
        onChangeTypeOfLoad(TodosType.All);
        break;

      case TodosType.Completed:
        onChangeTypeOfLoad(TodosType.Completed);
        break;

      case TodosType.Active:
        onChangeTypeOfLoad(TodosType.Active);
        break;

      default:
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChangeOnSelect}>

            {Object.values(TodosType).map(current => (
              <option value={current}>
                {`${current[0].toUpperCase() + current.slice(1)}`}
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
          onChange={(event) => onChangeQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="reset"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChangeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
