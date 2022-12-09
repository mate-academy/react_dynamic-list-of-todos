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
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const getTodosFromServer = useCallback(async () => {
    try {
      setIsLoading(true);
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(({ title, completed }) => {
      const includesQuery = title.toLowerCase()
        .includes(query.toLowerCase());

      switch (status) {
        case 'active':
          return !completed && includesQuery;

        case 'completed':
          return completed && includesQuery;

        case 'all':
        default:
          return includesQuery;
      }
    });
  }, [status, query, todos]);

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
                onChangeStatus={setStatus}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {!isLoading
                ? (
                  <TodoList
                    visibleTodos={filteredTodos}
                    selectedTodo={selectedTodo}
                    onSelectedTodo={setSelectedTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
