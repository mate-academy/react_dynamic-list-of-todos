/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const LoadTodos = useCallback(async () => {
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);
  }, []);

  const filteredTodos = useMemo(() => todos.filter(todo => {
    if ((status === 'active' && todo.completed)
    || (status === 'completed' && !todo.completed)) {
      return false;
    }

    return todo.title.toLowerCase().includes(query.toLowerCase());
  }), [todos, status]);

  useEffect(() => {
    LoadTodos();
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
                status={status}
                statusHandler={setStatus}
                queryHandler={setQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? (<Loader />)
                : (
                  <TodoList
                    todos={filteredTodos}
                    todoSelector={setSelectedTodo}
                    selectedTodoId={selectedTodo?.id}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          deselectTodo={() => setSelectedTodo(null)}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
