import { useState } from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  filter: React.Dispatch<Filter>;
  search: React.Dispatch<string>;
};

export const TodoFilter: React.FC<Props> = ({ filter, search }) => {
  const [input, setInput] = useState('');

  function inputHandler(data: string) {
    setInput(data);
    search(data);
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => filter(e.target.value as Filter)}
          >
            <option value={Filter.all}>All</option>
            <option value={Filter.active}>Active</option>
            <option value={Filter.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          value={input}
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => inputHandler(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {input !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => inputHandler('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
