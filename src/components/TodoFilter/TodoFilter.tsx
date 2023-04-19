import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { TodosFilterType } from '../../types/TodosFilterType';

type Props = {
  changeFilterBy: Dispatch<SetStateAction<TodosFilterType>>;
  query: string;
  changeQuery: Dispatch<SetStateAction<string>>;
  onClearField: () => void;
};

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    changeFilterBy,
    query,
    changeQuery,
    onClearField,
  } = props;

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeQuery(event.target.value.trim());
  };

  const handleChangeFilterType = (event: ChangeEvent<HTMLSelectElement>) => {
    changeFilterBy(event.target.value as TodosFilterType);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={handleChangeFilterType}
            data-cy="statusSelect"
          >
            <option value="all">
              {TodosFilterType.Default}
            </option>

            <option value="active">
              {TodosFilterType.Active}
            </option>

            <option value="completed">
              {TodosFilterType.Completed}
            </option>
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
          onChange={handleTextChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              aria-label="clear field"
              type="button"
              className="delete"
              onClick={onClearField}
            />
          </span>
        )}
      </p>
    </form>
  );
};
