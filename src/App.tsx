/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

type FilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<FilterStatus>('all');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleStatusChange = (newStatus: FilterStatus) => {
    setStatus(newStatus);
  };

  const filteredTodos = useMemo(() => {
    let filtered = todos; // Починаємо з повного списку справ

    // 1. Фільтрація за статусом
    if (status === 'active') {
      filtered = filtered.filter(todo => !todo.completed); // Залишаємо тільки не виконані
    } else if (status === 'completed') {
      filtered = filtered.filter(todo => todo.completed); // Залишаємо тільки виконані
    }
    // Якщо status === 'all', то фільтрація за статусом не потрібна

    // 2. Фільтрація за пошуковим запитом
    if (query.trim() !== '') {
      // Якщо запит не порожній
      const normalizedQuery = query.toLowerCase().trim(); // Переводимо запит у нижній регістр і прибираємо пробіли

      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return filtered; // Повертаємо відфільтрований список
  }, [todos, query, status]); // Залежності: переобчислюємо, якщо зміниться будь-яка з цих змінних

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={handleQueryChange}
                status={status}
                onStatusChange={handleStatusChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  onTodoSelect={handleTodoSelect}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleModalClose} />
      )}
    </>
  );
};
