/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

function filterTodos(todos: Todo[], activeFilter: Filter, query: string) {
  const q = query.toLowerCase().trim();
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(q),
  );

  if (activeFilter === 'active') {
    return filteredTodos.filter(todo => !todo.completed);
  }

  if (activeFilter === 'completed') {
    return filteredTodos.filter(todo => todo.completed);
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const visibleTodos = filterTodos(todos, activeFilter, query);

  useEffect(() => {
    const loadTodos = async () => {
      await getTodos().then(json => setTodos(json));
      setIsLoading(false);
    };

    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setActiveFilter={setActiveFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  activeTodo={activeTodo}
                  setActiveTodo={setActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal activeTodo={activeTodo} setActiveTodo={setActiveTodo} />
      )}
    </>
  );
};
