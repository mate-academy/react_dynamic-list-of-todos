import React, { ChangeEvent } from 'react';

type Props = {
  valueCategory: string;
  valueQwery: string;
  onCategory: (category: string) => void;
  onQwery: (qwery: string) => void;
  onClear: () => void;
};

enum Categories {
  all = '',
  active = 'active',
  completed = 'completed',
}

export const TodoFilter: React.FC<Props> = ({
  onCategory,
  onQwery,
  onClear,
  valueCategory,
  valueQwery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={valueCategory}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              onCategory(event.target.value);
            }}
          >
            <option value={Categories.all}>All</option>
            <option value={Categories.active}>Active</option>
            <option value={Categories.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={valueQwery.trimStart()}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onQwery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {valueQwery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onClear();
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
