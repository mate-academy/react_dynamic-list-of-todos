import React, { ChangeEvent } from 'react';

type Props = {
  value: string,
  response: string
  setValue: (value: string) => string | void,
  setResponse: (value: string) => string | void,
};

export const TodoFilter: React.FC<Props> = ({
  value,
  response,
  setValue,
  setResponse,
}) => {
  const handleNewValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  const handleNewResponse = (event: ChangeEvent<HTMLInputElement>) => {
    setResponse(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={value}
            onChange={handleNewValue}
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
          value={response}
          onChange={handleNewResponse}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {
            response && (
              /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setResponse('')}
              />
            )
          }
        </span>
      </p>
    </form>
  );
};
