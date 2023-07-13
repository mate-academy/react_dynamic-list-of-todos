import { getActive, getAllTodos, getCompleted } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  query: string;
  onSelect: (getTodos: () => Promise<Todo[]>) => void;
  onChange: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onSelect,
  onChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => {
            switch (event.target.value) {
              case 'all':
                onSelect(() => getAllTodos());
                break;
              case 'active':
                onSelect(() => getActive());
                break;
              case 'completed':
                onSelect(() => getCompleted());
                break;
              default:
            }
          }}
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
        onChange={event => onChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
