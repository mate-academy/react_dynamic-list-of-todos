import React from 'react';
import { FilterOption } from '../../types/Filter';

interface Props {
  onChangeOption: (event: FilterOption) => void;
  value: string,
  setValue: (query: string) => void,
}

export const TodoFilter: React.FC<Props> = React.memo(({
  onChangeOption,
  value,
  setValue,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={({ target }) => {
            switch (target.value) {
              case 'all':
                onChangeOption(FilterOption.All);
                break;
              case 'active':
                onChangeOption(FilterOption.Active);
                break;
              case 'completed':
                onChangeOption(FilterOption.Completed);
                break;
              default:
            }
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
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>
      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {value && (
          <button
            aria-label="delete"
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setValue('')}
          />
        )}
      </span>

    </p>
  </form>
));
