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
import { SelectStatus, getFiltred } from './getFiltred';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [todoStatus, setTodoStatus] = useState<SelectStatus>(SelectStatus.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data));
  }, []);

  const filtredTodos = useMemo(() => {
    return getFiltred(todos, { todoStatus, query });
  }, [todos, todoStatus, query]);

  const modalClose = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={todoStatus}
                onStatusChange={setTodoStatus}
              />
            </div>

            <div className="block">
              {todos.length !== 0 ? (
                <TodoList
                  todos={filtredTodos}
                  onSelectedTodo={setSelectedTodo}
                  todoId={selectedTodo?.id || null}
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
          todo={selectedTodo}
          modalClose={modalClose}
        />
      )}
    </>
  );
};
