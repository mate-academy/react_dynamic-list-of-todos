import { useState } from 'react';

interface Props {
  onSelectChange: (value: string) => void;
  onInputChange: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  onSelectChange,
  onInputChange,
}) => {
  const [input, setInput] = useState('');
  const handleSelectChange = (evnt: React.ChangeEvent<HTMLSelectElement>) => {
    return onSelectChange(evnt.target.value);
  };

  const handleInputChange = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    setInput(evnt.target.value);

    return onInputChange(evnt.target.value);
  };

  const handleInputReset = () => {
    setInput('');

    return onInputChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
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
          onChange={handleInputChange}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {input && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleInputReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
