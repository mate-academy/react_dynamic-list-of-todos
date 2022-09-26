import { ChangeEvent, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filter: (value : Todo[]) => void,
};

enum Status {
  all,
  active,
  complete,
}

export const TodoFilter: React.FC<Props> = ({ todos, filter }) => {
  const [status, setStatus] = useState(Status.all);
  const [quote, setQuote] = useState('');

  const handleFilter = (event: ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuote(value);
  };

  const handleStatus = (value: Status) => {
    setStatus(value);
  };

  useEffect(() => {
    let filtred = [...todos];

    if (status !== Status.all) {
      filtred = filtred
        .filter(todo => {
          const { completed } = todo;

          switch (status) {
            case Status.active:
              return !completed;
            case Status.complete:
              return completed;
            default:
              return false;
          }
        });
    }

    const lowerQuote = quote.toLowerCase();

    if (quote) {
      filtred = filtred.filter(todo => {
        return todo.title.includes(lowerQuote);
      });
    }

    filter(filtred);
  }, [status, quote]);

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="field has-addons"
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            className="option"
            value={status}
            onChange={(event) => handleStatus(+event.target.value)}
          >
            <option value={Status.all}>All</option>
            <option value={Status.active}>Active</option>
            <option value={Status.complete}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={quote}
          onChange={handleFilter}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {quote
        && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuote('')}
            />
          </span>
        )}

      </p>
    </form>
  );
};
