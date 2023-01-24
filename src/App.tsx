/* eslint-disable max-len */
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
import { Todo } from './types/Todo';
import { getTodos } from './api';

enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

function handleQuery(todoTitle: string, query: string) {
  return todoTitle.toLowerCase().includes(query.toLowerCase());
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredStatus, setFilteredStatus] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  const handelSelectedTodo = (todoId: number | null) => (
    todoId
      ? (setSelectedTodo(todos.find(todo => todo.id === todoId) || null))
      : setSelectedTodo(null)
  );

  const requestedTodos = async () => (
    setTodos(await getTodos())
  );

  useEffect(() => {
    requestedTodos();
  }, []);

  const handleStatus = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredStatus(event.target.value);
  }, []);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const getFilteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filteredStatus) {
        case FilterStatus.COMPLETED: {
          return todo.completed && handleQuery(todo.title, query);
        }

        case FilterStatus.ACTIVE: {
          return !todo.completed && handleQuery(todo.title, query);
        }

        default:
          return handleQuery(todo.title, query);
      }
    });
  }, [todos, query, filteredStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectStatus={filteredStatus}
                onSelectStatus={handleStatus}
                query={query}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={getFilteredTodos}
                  selectedId={selectedTodo?.id}
                  onSelected={handelSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={handelSelectedTodo}
        />
      )}
    </>
  );
};
