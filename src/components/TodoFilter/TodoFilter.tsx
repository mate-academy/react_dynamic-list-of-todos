import { FilterOptions } from '../../types/FilterOptions';

interface Props {
  handleSelectChange: (select: FilterOptions) => void;
  handleInputChange: (input: string) => void;
  selectInput: string;
  inputValue: string;
}

export const TodoFilter: React.FC<Props> = ({
  handleSelectChange,
  handleInputChange,
  selectInput,
  inputValue,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => {
            handleSelectChange(event.target.value as FilterOptions);
          }}
        >
          <option value={FilterOptions.All}>All</option>
          <option value={FilterOptions.Active}>Active</option>
          <option value={FilterOptions.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={inputValue}
        onChange={(event) => {
          handleInputChange(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {selectInput && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              handleInputChange('');
            }}
          />
        )}
      </span>
    </p>
  </form>
);
