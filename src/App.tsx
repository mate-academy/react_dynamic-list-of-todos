/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(serverTodos => {
        setTodos(serverTodos);
        setLoading(false);
      });
  }, []);

  const openModal = (todoId: number) => {
    setSelectedTodo(todos.find(todo => todo.id === +todoId) || null);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

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
                filter={filter}
                setFilter={setFilter}
              />
            </div>
            <div className="block">
              <TodoList
                loading={loading}
                selectedTodo={selectedTodo}
                filter={filter}
                query={query}
                todos={todos}
                openModal={openModal}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
