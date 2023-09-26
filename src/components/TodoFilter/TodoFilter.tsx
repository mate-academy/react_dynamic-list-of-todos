import { FilterForm } from '../../types/FilterForm';

type Props = {
  valueFormItems: FilterForm,
  handleChange: (key: string, value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  valueFormItems,
  handleChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          className="statusSelect"
          value={valueFormItems.statusSelect}
          onChange={e => handleChange(e.target.className, e.target.value)}
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
        value={valueFormItems.input}
        onChange={e => handleChange(e.target.className, e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {valueFormItems.input && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => handleChange('input', '')}
          />
        )}
      </span>
    </p>
  </form>
);
