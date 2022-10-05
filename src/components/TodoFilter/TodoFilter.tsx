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

  const handleFilter = (
    event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    setQuote(value);
  };

  const handleStatus = (value: Status) => {
    setStatus(value);
  };

  useEffect(() => {
    const lowerQuote = quote.toLowerCase();

    const filtred = todos
      .filter(todo => {
        const { completed } = todo;

        switch (status) {
          case Status.active:
            if (quote) {
              return !completed && todo.title.includes(lowerQuote);
            }

            return !completed;
          case Status.complete:
            if (quote) {
              return completed && todo.title.includes(lowerQuote);
            }

            return completed;
          default:
            return todo.title.includes(lowerQuote);
        }
      });

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

            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuote('')}
              aria-label="Clear"
            />
          </span>
        )}

      </p>
    </form>
  );
};
