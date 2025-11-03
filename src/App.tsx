/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);

      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (error) {
        // eslint-disable-next-line
        console.error('Error loading todos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) || null;

  const handleSelect = (todoId: number) => {
    setSelectedTodoId(prev => (prev === todoId ? null : todoId));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                search={search}
                onStatusChange={setStatus}
                onSearchChange={setSearch}
                onClearSearch={() => setSearch('')}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId || undefined}
                  onSelect={handleSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodoId(null)}
        />
      )}
    </>
  );
};
