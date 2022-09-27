import { ChangeEvent } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  value: string;
  setValue: (argument: string) => void;
  text: string;
  setText: (argument: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  value,
  setValue,
  text,
  setText,
}) => {
  const handleChangeValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleChangeText = (event:
  ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={value}
            onChange={handleChangeValue}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>
      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          type="text"
          data-cy="searchInput"
          className="input"
          placeholder="Search..."
          value={text}
          onChange={handleChangeText}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
        >
          {text !== '' && (
            <>
              <button
                type="button"
                data-cy="clearSearchButton"
                className="delete"
                onClick={() => setText('')}
                aria-label="Clear search query"
              />
            </>
          )}
        </span>
      </p>
    </form>
  );
};
