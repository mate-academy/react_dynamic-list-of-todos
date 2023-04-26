// eslint-disable-next-line import/no-cycle
import { FilterValues } from '../../App';

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
          <option value={FilterValues.All.toLowerCase()}>
            {FilterValues.All}
          </option>
          <option value={FilterValues.Active.toLowerCase()}>
            {FilterValues.Active}
          </option>
          <option value={FilterValues.Completed.toLowerCase()}>
            {FilterValues.Completed}
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

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          data-cy="clearSearchButton"
          type="button"
          className="delete"
        />
      </span>
    </p>
  </form>
);
