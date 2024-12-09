import { Visible } from '../../types/Visible';

type Props = {
  visible: Visible;
  setVisible: (arg: Visible) => void;
  filterBy: string;
  setFilterBy: (arg: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  visible = 'all',
  setVisible,
  filterBy = '',
  setFilterBy,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={visible}
          onChange={e => setVisible(e.target.value as Visible)}
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
        value={filterBy}
        onChange={e => setFilterBy(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {filterBy !== '' && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setFilterBy('')}
          />
        )}
      </span>
    </p>
  </form>
);
