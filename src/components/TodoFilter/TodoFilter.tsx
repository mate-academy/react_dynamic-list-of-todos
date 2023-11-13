import { ShowType } from '../../types/ShowType';
import { capitalLetter } from '../../utils/capitalLetter';

interface Props {
  show: ShowType;
  filter: string;
  onChangeShow: (value: ShowType) => void;
  onChangeFilter: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  onChangeShow,
  show,
  onChangeFilter,
  filter,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={show}
            onChange={(event) => onChangeShow(event.target.value as ShowType)}
          >
            {Object.keys(ShowType).map((key) => (
              <option value={key} key={key}>{capitalLetter(key)}</option>
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
          value={filter}
          onChange={(event) => onChangeFilter(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {filter && (
            <button
              data-cy="clearSearchButton"
              aria-label="clear"
              type="button"
              className="delete"
              onClick={() => onChangeFilter('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
