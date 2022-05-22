import classNames from 'classnames';
import React from 'react';
import './Search.scss';

type Props = {
  random: boolean,
  seachingValue: (event: React.ChangeEvent<HTMLInputElement>) => void,
  selectValue: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  randomize: () => void,
};

export const SearchPanel: React.FC<Props> = ({
  random,
  seachingValue,
  selectValue,
  randomize,
}) => {
  return (
    <>
      <h2>Todos:</h2>

      <div className="Search-panel__form">
        <input
          type="text"
          name="query"
          className="Search-panel__form__search"
          placeholder="Type search todo"
          onChange={(event) => seachingValue(event)}
        />

        <select
          className="Search-panel__form__select"
          onChange={(event) => selectValue(event)}
        >
          <option
            value=""
            className="Search-panel__form__select__option"
          >
            Choose filter
          </option>
          <option value="all">All ToDos</option>
          <option value="completed">Completed Todos</option>
          <option value="not-complete">Active ToDos</option>
        </select>

        <button
          type="button"
          title="Random todos sort"
          className={classNames(
            'Search-panel__form__button',
            { 'Search-panel__form__button--on': random },
          )}
          onClick={randomize}
        >
          {random ? 'Randomize On' : 'Randomize Off'}
        </button>
      </div>
    </>
  );
};
