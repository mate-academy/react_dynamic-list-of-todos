/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Filter } from '../../types/Filter';

interface Props {
  changeQuerry: (qerry: string) => void;
  changeFilter: (filter: Filter) => void;
}

export const TodoFilter: React.FC<Props> = (props) => {
  const { changeFilter, changeQuerry } = props;
  const [querry, setQuerry] = useState('');
  const [filter, setFilter] = useState('all');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>):void {
    setQuerry(event.target.value);
    changeQuerry(event.target.value);
  }

  function resetQuerry():void {
    setQuerry('');
    changeQuerry('');
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>):void {
    // eslint-disable-next-line prefer-destructuring
    const value = event.target.value;

    setFilter(value);

    switch (value) {
      case 'active':
        changeFilter(Filter.Active);
        break;
      case 'completed':
        changeFilter(Filter.Completed);
        break;
      default: changeFilter(Filter.All);
    }
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
            value={filter}
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
          value={querry}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!querry && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQuerry}
            />
          )}
        </span>
      </p>
    </form>
  );
};
