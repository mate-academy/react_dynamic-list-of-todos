import { TodoCompletedCategory } from '../../types/todoCompletedCategory';

type Props = {
  query: string;
  onQuery: React.Dispatch<React.SetStateAction<string>>;
  todoCategory: string;
  onTodoCategory: React.Dispatch<React.SetStateAction<TodoCompletedCategory>>;
};

const nameForCategoriesOption = {
  [TodoCompletedCategory.all]: 'All',
  [TodoCompletedCategory.active]: 'Active',
  [TodoCompletedCategory.competed]: 'Competed',
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQuery,
  todoCategory,
  onTodoCategory,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={todoCategory}
            onChange={event =>
              onTodoCategory(event.target.value as TodoCompletedCategory)
            }
          >
            {Object.values(TodoCompletedCategory).map(option => (
              <option key={option} value={option.toLowerCase()}>
                {nameForCategoriesOption[option]}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={query}
          placeholder="Search..."
          onChange={event => onQuery(event.target.value.toLowerCase())}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
