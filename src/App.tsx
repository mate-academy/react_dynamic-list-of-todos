import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { filterAndSearchTodos } from './Filters/filters';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosError, setTodosError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>(TodoStatus.All);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then((todosData) => {
        setTodos(todosData);
      })
      .catch((error) => setTodosError(error.message))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const currentFilteredTodos
  = filterAndSearchTodos(todos, filterStatus, searchQuery);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                setFilterStatus={setFilterStatus}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>
            <div className="block">
              {loading
                ? <Loader />
                : (
                  <TodoList
                    todos={currentFilteredTodos}
                    onSelectTodo={onSelectTodo}
                    selectedTodoId={selectedTodo?.id ?? null}
                  />
                )}

              {todosError && (
                <p>{todosError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
