import { Select } from '../../types/Select';

type Props = {
  setFilterSelect: (filterSelect: Select | string) => void;
  setInputSelect: (inputSelect: string) => void;
  inputSelect: string;
};

export const TodoFilter: React.FC<Props> = ({
  setFilterSelect,
  setInputSelect,
  inputSelect,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => {
              setFilterSelect(e.target.value);
            }}
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
          value={inputSelect}
          onChange={e => {
            setInputSelect(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputSelect && (
          <span className="icon is-right" style={{ pointerEvents: Select.all }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setInputSelect('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
