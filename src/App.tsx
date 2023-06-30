/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loader, setLoader] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);

  const visibleTodos = useMemo(() => {
    const normQuery = query.toLowerCase().trim();
    let filteredTodos = [...todos];

    if (normQuery) {
      filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(normQuery));
    }

    switch (selectedFilter) {
      case 'active':
        return filteredTodos.filter(todo => !todo.completed);

      case 'completed':
        return filteredTodos.filter(todo => todo.completed);

      default:
        return filteredTodos;
    }
  }, [query, selectedFilter, todos]);

  const getTodo = useCallback(async () => {
    try {
      const loadedTodo = await getTodos();

      setTodos(loadedTodo);
      setLoader(false);
    } catch {
      setLoader(true);
    }
  }, []);

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  const clearDataModal = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const openDataModal = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                query={query}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </div>

            <div className="block">
              {loader
                ? <Loader />
                : (
                  <TodoList
                    selectedTodo={selectedTodo}
                    todos={visibleTodos}
                    setModalOpened={setModalOpened}
                    handleDataModal={openDataModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {modalOpened && (
        <TodoModal
          clearDataModal={clearDataModal}
          selectedTodo={selectedTodo}
          setModalOpened={setModalOpened}
        />
      )}
    </>
  );
};
