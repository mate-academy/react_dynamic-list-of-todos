/* eslint-disable jsx-a11y/control-has-associated-label */
import { ChangeEvent } from 'react';

type Props = {
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  selectedOption: string,
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>,
};

export const TodoFilter = ({
  query,
  setQuery,
  selectedOption,
  setSelectedOption,
} : Props) => {
  const handleChangeSelect = (event : ChangeEvent<HTMLSelectElement>) => {
    const selectValue = event.target.value;

    setSelectedOption(selectValue);
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setQuery(inputValue);
  };

  const resetInput = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={handleChangeSelect}
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
          value={query}
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
