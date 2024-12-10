import { Filter } from '../../types/Options';

interface Props {
  inputValue: string;
  handleSelectedOption: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilterParams: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  inputValue,
  handleSelectedOption,
  handleQueryChange,
  resetFilterParams,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={handleSelectedOption}>
          <option value="all">{Filter.all}</option>
          <option value="active">{Filter.active}</option>
          <option value="completed">{Filter.completed}</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={inputValue}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        onChange={handleQueryChange}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {inputValue && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={resetFilterParams}
          />
        )}
      </span>
    </p>
  </form>
);
