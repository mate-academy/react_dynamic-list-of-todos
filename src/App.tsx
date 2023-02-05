import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { debounce } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isSelected, setIsSelected] = useState(true);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch (error) {
        setTodos([]);
      } finally {
        setIsSelected(false);
      }
    };

    loadTodos();
  }, []);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 500), [],
  );

  const clearQuery = appliedQuery.toLowerCase().trim();

  const visibleTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return todo.title.toLowerCase()
          .includes(clearQuery);

      case 'active':
        return !todo.completed
          && todo.title.toLowerCase()
            .includes(clearQuery);

      case 'completed':
        return todo.completed
          && todo.title.toLowerCase()
            .includes(clearQuery);

      default:
        return todo;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                applyQuery={applyQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isSelected && <Loader />}

              {todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
