import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [statusFilter, setStatusFilter] = useState<FilterType>('all');

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (statusFilter === 'active') return !todo.completed;
        if (statusFilter === 'completed') return todo.completed;
        return true;
      })
      .filter(todo =>
        todo.title.toLowerCase().includes(searchFilter.toLowerCase()),
      );
  }, [todos, statusFilter, searchFilter]);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}

              <TodoList
                todos={visibleTodos}
                setSelectedTodoId={setSelectedTodoId}
                selectedTodoId={selectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
