import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import TodosStatusQuery from '../../constants/TodosStatusQuery';

interface Props {
  todos: Todo[];
  setPreparedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const getFiltredTodosByStatus = (todos: Todo[], query: TodosStatusQuery) => {
  if (query === TodosStatusQuery.all) {
    return todos;
  }

  switch (query) {
    case TodosStatusQuery.active:
      return todos.filter(todo => !todo.completed);
    case TodosStatusQuery.completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

const getFiltredTodosByText = (todos: Todo[], query: string) => {
  return todos.filter(todo => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  setPreparedTodos,
}) => {
  const [textQuery, setTextQuery] = useState('');
  const [statusQuery, setStatusQuery] = useState(TodosStatusQuery.all);

  useEffect(() => {
    let filtredTodos = getFiltredTodosByStatus(todos, statusQuery);

    filtredTodos = getFiltredTodosByText(filtredTodos, textQuery);

    setPreparedTodos(filtredTodos);
  }, [todos, textQuery, statusQuery]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusQuery(event.target.value as TodosStatusQuery);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
          >
            <option value={TodosStatusQuery.all}>All</option>
            <option value={TodosStatusQuery.active}>Active</option>
            <option value={TodosStatusQuery.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={textQuery}
          onChange={(event) => setTextQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {textQuery && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setTextQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
