import { SortField } from '../../types/SortField';

type Props = {
  setFilter: (velue: SortField) => void;
  setSearchTerm: (velue: string) => void;
  searchTerm: string;
};
export const TodoFilter: React.FC<Props> = ({
  setFilter,
  setSearchTerm,
  searchTerm,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setFilter(selectedValue as SortField);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setSearchTerm(inputValue);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChange}>
            <option value={SortField.All}>All</option>
            <option value={SortField.Active}>Active</option>
            <option value={SortField.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={searchTerm}
          className="input"
          placeholder="Search..."
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right pointer-events-all">
          {searchTerm && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchTerm('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
