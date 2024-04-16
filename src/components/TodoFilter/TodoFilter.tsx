import React from 'react';
import { Options } from '../../types/Options';

type Props = {
  text: string;
  setText: (text: string) => void;
  option: Options;
  setOption: (text: Options) => void;
};

export const TodoFilter: React.FC<Props> = ({
  text,
  setText,
  option,
  setOption,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={option}
          onChange={e => {
            switch (e.target.value) {
              case Options.All:
                setOption(Options.All);
                break;

              case Options.Active:
                setOption(Options.Active);
                break;

              case Options.Completed:
                setOption(Options.Completed);
                break;
            }
          }}
        >
          <option value={Options.All}>All</option>
          <option value={Options.Active}>Active</option>
          <option value={Options.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {text && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setText('')}
          />
        )}
      </span>
    </p>
  </form>
);
