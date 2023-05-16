import { FilterValues } from '../../types/FilterValues';

type Props = {
  selectValue: string,
  onChangeSelect(value: string): void,
  inputValue: string,
  onChangeInput(value: string): void,
};

export const TodoFilter: React.FC<Props> = ({
  selectValue,
  onChangeSelect,
  inputValue,
  onChangeInput,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectValue}
          onChange={(e) => onChangeSelect(e.target.value)}
        >
          <option value={FilterValues.All}>
            All
          </option>
          <option value={FilterValues.Active}>
            Active
          </option>
          <option value={FilterValues.Completed}>
            Completed
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
        value={inputValue}
        onChange={(e) => onChangeInput(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {inputValue.length > 0 && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChangeInput('')}
          />
        </span>
      )}
    </p>
  </form>
);
