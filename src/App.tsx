import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedTodo = todos.find(({ id }) => id === selectedTodoId) || null;

  const handleClose = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const handleSelectionFilter = useCallback((value: string) => {
    setSelectedFilter(value);
  }, []);

  const handleQuery = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleSelectionTodo = useCallback((value: number) => {
    setSelectedTodoId(value);
  }, []);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (selectedFilter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    }).filter(todo => {
      const lowerTodoTitle = todo.title.toLowerCase();
      const lowerQuery = searchQuery.toLowerCase();

      return lowerTodoTitle.includes(lowerQuery);
    });
  }, [searchQuery, selectedFilter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectionCategory={handleSelectionFilter}
                searchQuery={searchQuery}
                onQueryChange={handleQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodoId}
                onTodoSelection={handleSelectionTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={handleClose}
        />
      )}
    </>
  );
};
