import { Type } from '../../types/Type';

type Props = {
  inputValue: string,
  onChangeInput: (inputValue: string) => void,
  selectValue: Type,
  onChangeSelect: React.Dispatch<React.SetStateAction<Type>>
};

export const TodoFilter: React.FC<Props> = ({
  inputValue, onChangeInput, selectValue, onChangeSelect,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectValue}
          onChange={event => onChangeSelect(event.target.value as Type)}
        >
          <option value={Type.All}>All</option>
          <option value={Type.ACTIVE}>Active</option>
          <option value={Type.COMPLETED}>Completed</option>
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
        onChange={event => {
          onChangeInput(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {inputValue && (
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
