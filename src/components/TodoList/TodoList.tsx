import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { TodoFilter } from '../TodoFilter';
import { TodoModal } from '../TodoModal';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFilter, setHasFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(fetchedTodos => {
      setTodos(fetchedTodos);
      setIsLoading(false);
    });
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todoItem => {
      const matchesQuery = query
        ? todoItem.title.toLowerCase().includes(query.toLowerCase().trim())
        : true;

      let matchesFilter;

      switch (hasFilter) {
        case 'active':
          matchesFilter = !todoItem.completed;
          break;
        case 'completed':
          matchesFilter = todoItem.completed;
          break;
        default:
          matchesFilter = true;
      }

      return matchesQuery && matchesFilter;
    });
  }, [query, hasFilter, todos]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TodoFilter
        filter={hasFilter}
        setFilter={setHasFilter}
        query={query}
        setQuery={setQuery}
      />
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {filteredTodos.map(todoItem => (
            <tr
              key={todoItem.id}
              data-cy="todo"
              className={
                selectedTodo?.id === todoItem.id
                  ? 'has-background-info-light'
                  : ''
              }
            >
              <td className="is-vcentered">{todoItem.id}</td>
              <td className="is-vcentered">
                {todoItem.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todoItem.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todoItem.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setSelectedTodo(todoItem)}
                >
                  <span className="icon">
                    <i
                      className={`far ${selectedTodo === todoItem ? 'fa-eye-slash' : 'fa-eye'}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
