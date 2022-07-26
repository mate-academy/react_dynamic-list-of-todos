import React from 'react';
import './TodoFilter.scss';
import classNames from 'classnames';
import { Filter } from '../../Filter';

type Props = {
  setOption: (option: string) => void,
  setSearchWord: (searchWord: string) => void,
};

export const TodoFilter: React.FC<Props> = ({ setOption, setSearchWord }) => {
  const [word, setWord] = React.useState('');

  React.useEffect(() => setSearchWord(word), [word]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => setOption(event.target.value)}
          >
            <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLEATED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={word}
          onChange={(event) => setWord(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className={classNames('delete', { 'close-btn': word.length === 0 })}
            onClick={() => setWord('')}
          />
        </span>
      </p>
    </form>
  );
};
