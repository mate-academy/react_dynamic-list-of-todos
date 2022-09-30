import { ChangeEvent } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filter: string,
  setCurentFilter: (value: string) => void,
  query:string;
  setQuery: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filter, setCurentFilter, query, setQuery,
}) => {
  const handlSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurentFilter(event.target.value);
  };

  const handlQuery = (event: { target: { value: string; }; }) => {
    setQuery(event.target.value);
  };

  const deleteQuery = () => {
    setQuery('');
  };

  return (

    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handlSelect}
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
          onChange={handlQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {(query !== '') && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={deleteQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
