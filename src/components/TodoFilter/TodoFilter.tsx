import { FC, useState } from 'react';

import { Todo } from '../../types/Todo';
import { SelectTypes } from '../../types/Enum';

type Props = {
  search: (value: string, select: SelectTypes) => Todo[] | null;
  setVisibleTodos: (val: Todo[] | null) => void;
};

export const TodoFilter:FC<Props> = ({ search, setVisibleTodos }) => {
  const [text, setText] = useState('');
  const [selected, setSelected] = useState(SelectTypes.ALL);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selected}
            onChange={(event) => {
              setSelected(event.target.value as SelectTypes);

              setVisibleTodos(search(text, event.target.value as SelectTypes));
            }}
          >
            <option value={SelectTypes.ALL}>All</option>
            <option value={SelectTypes.ACTIVE}>Active</option>
            <option value={SelectTypes.COMPLETED}>Completed</option>
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
          onChange={(event) => {
            setText(event.target.value);

            setVisibleTodos(search(event.target.value, selected));
          }}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {text.length !== 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setText('');

                setVisibleTodos(search('', SelectTypes.ALL));
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
