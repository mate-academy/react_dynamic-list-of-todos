/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

enum TodoStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<string>(TodoStatus.ALL);
  const [query, setQuery] = useState('');

  const filteredTodos = useMemo(() => (
    todos.filter((todo) => {
      if (status === TodoStatus.ACTIVE && todo.completed) {
        return false;
      }

      if (status === TodoStatus.COMPLETED && !todo.completed) {
        return false;
      }

      return todo.title.toLowerCase().includes(query.toLowerCase());
    })
  ), [todos, status]);

  const loadTodos = useCallback(async () => {
    const loadedtodos = await getTodos();

    setTodos(loadedtodos);
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeQuery={setQuery}
                onChangeStatus={setStatus}
                statusOptions={[TodoStatus.ALL, TodoStatus.ACTIVE, TodoStatus.COMPLETED]}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={filteredTodos}
                    onSelectTodo={setSelectedTodo}
                    selectedTodoId={selectedTodo?.id}
                  />
                )
                : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          deselectTodo={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
