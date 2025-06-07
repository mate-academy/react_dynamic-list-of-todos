/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useEffect, useState, useMemo } from 'react';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [originalTodos, setOriginalTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  // Carrega todos na inicialização
  useEffect(() => {
    if (originalTodos.length === 0) {
      setIsLoading(true);

      getTodos()
        .then(response => {
          setTimeout(() => {
            setOriginalTodos(response);
            setIsLoading(false);
          }, 1000);
        })
        .catch(error => {
          error('Erro ao carregar todos:', error);
          setIsLoading(false);
        });
    }
  }, [originalTodos.length]);

  // Filtra todos usando useMemo para performance
  const filteredTodos = useMemo(() => {
    let filtered = [...originalTodos];

    // Aplica filtro de status
    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    // Aplica busca
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return filtered;
  }, [originalTodos, filter, query]);

  // Handlers
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearQuery = () => {
    setQuery('');
  };

  const filterByActive = () => {
    setFilter('active');
  };

  const filterByCompleted = () => {
    setFilter('completed');
  };

  const resetFilters = () => {
    setFilter('all');
    setQuery('');
  };

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              filterByActive={filterByActive}
              filterByCompleted={filterByCompleted}
              resetFilters={resetFilters}
              query={query}
              setQuery={handleQueryChange}
              closeByQuery={clearQuery}
            />
          </div>

          <div className="block">
            {isLoading ? (
              <Loader />
            ) : (
              <TodoList todos={filteredTodos} onTodoClick={handleTodoClick} />
            )}
          </div>
        </div>
      </div>

      <TodoModal
        open={!!selectedTodo}
        onClose={closeModal}
        todo={selectedTodo}
      />
    </div>
  );
};
