import React from 'react';
import { Options } from '../../types/Options';

type Props = {
  onSelectedOption: (selectedOption: Options) => void;
  onInputChange: (query: string) => void;
  inputValue: string,
  onClearQuery: () => void,
};

const SELECTED_OPTIONS = [Options.ALL, Options.ACTIVE, Options.COMPLETED];

export const TodoFilter: React.FC<Props> = ({
  onSelectedOption,
  onInputChange,
  inputValue,
  onClearQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => onSelectedOption(e.target.value as Options)}
          >
            {SELECTED_OPTIONS.map(option => {
              return (
                <option
                  value={option.toLowerCase()}
                  key={option}
                >
                  {option}
                </option>
              );
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
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputValue.trim() && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
