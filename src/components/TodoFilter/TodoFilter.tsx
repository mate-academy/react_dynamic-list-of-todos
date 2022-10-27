import { Category } from '../../types/Category';

type Props = {
  setCategory: (category: Category) => void,
  setQwery: (qwery: string) => void,
  qwery: string,
};

export const TodoFilter: React.FC<Props> = ({
  setCategory,
  setQwery,
  qwery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => {
            setCategory(event.target.value as Category);
          }}
        >
          <option value={Category.ALL}>All</option>
          <option value={Category.ACTIVE}>Active</option>
          <option value={Category.COMPLETED}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={qwery}
        onChange={(event) => {
          setQwery(event.target.value);
        }}
      />

      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {qwery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              setQwery('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
