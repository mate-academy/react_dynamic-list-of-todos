import { SELECT } from '../../types/SELECT';

type Props = {
  onChangeSelect: (value: SELECT) => void,
  value: string,
  onSearchValue: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  onChangeSelect,
  onSearchValue,
  value,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(e) => {
            onChangeSelect(SELECT[e.target.value as keyof typeof SELECT]);
          }}
        >
          {Object.entries(SELECT).map(item => {
            return <option value={item[0]}>{item[1]}</option>;
          })}
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={value}
        onChange={(e) => onSearchValue(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {value && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSearchValue('')}
          />
        </span>
      )}
    </p>
  </form>
);
