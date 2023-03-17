import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

const getVisibleTodos = (
  todos: Todo[],
  sortType: string,
  query: string,
): Todo[] => {
  let categoryFiltered = todos;

  if (sortType === 'active') {
    categoryFiltered = todos.filter(todo => !todo.completed);
  }

  if (sortType === 'completed') {
    categoryFiltered = todos.filter(todo => todo.completed);
  }

  return categoryFiltered.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));
};

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [sortType, setSortType] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const newTodos = await getTodos();

        setTodos(newTodos);
      } catch {
        throw new Error('Something went wrong');
      }
    };

    getTodosFromServer();
  }, []);

  const handleActiveTodo = useCallback((id: number): void => {
    const newActiveTodo = todos.find(todo => todo.id === id);

    setActiveTodo(newActiveTodo || null);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, sortType, query);
  }, [todos, sortType, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSelectChange={setSortType}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    activeId={activeTodo?.id || 0}
                    setActiveId={handleActiveTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal todo={activeTodo} onClose={() => handleActiveTodo(0)} />
      )}
    </>
  );
};
