import { useState } from 'react';

type Props = {
  onFilterSelected: (nameFilter: string) => void;
  textInput: (text: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterSelected, textInput,
}) => {
  const [statusSelect, setStatusSelect] = useState('all');
  const [input, setInput] = useState('');

  onFilterSelected(statusSelect);
  textInput(input.toLowerCase());

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusSelect}
            onChange={(event) => setStatusSelect(event.target.value)}
          >
            <option
              value="all"
            >
              All
            </option>
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
          value={input}
          onChange={event => setInput(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setInput('')}
          />
        </span>
      </p>
    </form>
  );
};
