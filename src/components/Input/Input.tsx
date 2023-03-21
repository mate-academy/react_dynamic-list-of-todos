import { memo } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const Input: React.FC<Props> = memo(
  ({ value, onChange }) => (
    <>
      <input
        type="text"
        value={value}
        className="input"
        data-cy="searchInput"
        placeholder="Search..."
        onChange={(e) => onChange(e.target.value.toLowerCase())}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>
      <span
        className="icon is-right"
        style={{ pointerEvents: 'all' }}
      >
        {value && (
          <>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="clearSearchButton"
              onClick={() => onChange('')}
            />
          </>
        )}
      </span>
    </>
  ),
);
