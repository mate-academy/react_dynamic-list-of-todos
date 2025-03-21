import { Select } from '../../App';

type Props = {
  selectTodoOption: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedValue: Select;
  setSearchQueryTitle: (value: string) => void;
  searchQueryTitle: string;
};

export const TodoFilter: React.FC<Props> = ({
  selectTodoOption,
  selectedValue,
  setSearchQueryTitle,
  searchQueryTitle,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          onChange={event => selectTodoOption(event)}
          value={selectedValue}
          data-cy="statusSelect"
        >
          <option value={Select.ALL}>All</option>
          <option value={Select.ACTIVE}>Active</option>
          <option value={Select.COMPLETED}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={searchQueryTitle}
        onChange={event => setSearchQueryTitle(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {searchQueryTitle && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSearchQueryTitle('')}
          />
        )}
        {/* <button data-cy="clearSearchButton" type="button" className="delete" /> */}
      </span>
    </p>
  </form>
);
