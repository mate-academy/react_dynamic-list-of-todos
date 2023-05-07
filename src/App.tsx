/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filterTodos = () => {
    let filteredTodos: Todo[] = [...todos];

    if (filter !== 'all') {
      filteredTodos = filteredTodos.filter(todo => {
        return filter === 'active' ? !todo.completed : todo.completed;
      });
    }

    if (searchQuery.trim() !== '') {
      filteredTodos = filteredTodos.filter(todo => {
        return todo.title.includes(searchQuery.trim());
      });
    }

    return filteredTodos;
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setLoading(false);
        setTodos(todosFromServer);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos()}
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
          closeModal={closeModal}
        />
      )}
    </>
  );
};
