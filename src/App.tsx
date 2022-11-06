import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todosStatus, setTodosStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();

      setVisibleTodos(response);
    };

    fetchTodos();
  }, []);

  const filteredTodos = visibleTodos.filter(({ completed, title }) => {
    const lowerCaseTitle = title.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();

    switch (todosStatus) {
      case 'active':
        return !completed && lowerCaseTitle.includes(lowerCaseQuery);
      case 'completed':
        return completed && lowerCaseTitle.includes(lowerCaseQuery);
      default:
        return lowerCaseTitle.includes(lowerCaseQuery);
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
                todosStatus={todosStatus}
                query={query}
                setTodosStatus={setTodosStatus}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {visibleTodos.length > 0
                ? (
                  <TodoList
                    todos={filteredTodos}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
