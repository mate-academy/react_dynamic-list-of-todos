import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

function getPreparedTodos(todos: Todo[], filter: string,
  query: string): Todo[] {
  const preparedTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default:
        return true;
    }
  });

  if (query) {
    return preparedTodos.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewTodoId, setViewTodoId] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const saveTodoId = (id: number | null) => {
    setViewTodoId(id);
  };

  const onChange = (e: string) => {
    setFilter(e);
  };

  const onQueryChange = (e: string) => {
    setQuery(e);
  };

  const visibleTodos = getPreparedTodos(todos, filter, query);

  const viewTodo = todos.find(todo => todo.id === viewTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setOption={onChange}
                setQuery={onQueryChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                viewTodoId={viewTodoId}
                onEyeClick={saveTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {viewTodoId && (
        <TodoModal
          viewTodo={viewTodo || null}
          onClose={saveTodoId}
        />
      )}
    </>
  );
};
