import { useState } from 'react';

type Props = {
  onSelectChange: (select:string) => void;
  onInputChange: (input: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ 
  onInputChange,
  onSelectChange, 
}) => {
  const [input, setInput] = useState('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => {
              onSelectChange(e.target.value);
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
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            onInputChange(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {input && (
          /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setInput('');
                onInputChange('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
