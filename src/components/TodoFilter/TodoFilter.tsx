import { ChangeEvent, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filter: (value : Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = ({ todos, filter }) => {
  const [status, setStatus] = useState('all');
  const [quote, setQuote] = useState('');

  // console.log(todos);

  const handleFilter = (event: ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLInputElement>) => {
    if (event.target.className === 'option') {
      setStatus(event.target.value);
    }

    if (event.target.className === 'input') {
      setQuote(event.target.value);
    }
    // console.log(event.target.className);
  };

  useEffect(() => {
    let filtred = [...todos];

    if (status !== 'all') {
      filtred = filtred
        .filter(todo => {
          switch (status) {
            case 'active':
              return !todo.completed;
            case 'completed':
              return todo.completed;
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

    // console.log(filtred);

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
            onChange={handleFilter}
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
