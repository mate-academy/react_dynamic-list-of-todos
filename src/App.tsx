/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TODO_STATUS, TodoStatus } from './types/todoFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<TodoStatus>(TODO_STATUS.ALL);

  const openTodo = (todo: Todo) => setSelectedTodo(todo);
  const closeTodo = () => setSelectedTodo(null);
  const handleStatusChange = (todoStatus: TodoStatus) =>
    setFilterStatus(todoStatus);
  const handleQueryChange = (q: string) => setQuery(q);

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      if (
        normalizedQuery &&
        !todo.title.toLocaleLowerCase().includes(normalizedQuery)
      ) {
        return false;
      }

      switch (filterStatus) {
        case TODO_STATUS.ACTIVE:
          return !todo.completed;
        case TODO_STATUS.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [query, filterStatus, todos]);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
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
                filterStatus={filterStatus}
                onStatusChange={handleStatusChange}
                searchQuery={query}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={openTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} closeModal={closeTodo} />}
    </>
  );
};
