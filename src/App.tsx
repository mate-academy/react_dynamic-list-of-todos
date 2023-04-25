/* eslint-disable max-len */
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

enum StatusTodos {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoaded, setIsLoadTodos] = useState(false);
  const [todoId, setTodoId] = useState(0);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  const loadTodos = useCallback(async () => {
    const dataTodos = await getTodos();

    setTodos(dataTodos);
    setIsLoadTodos(true);
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const getCheckQuery = useCallback((str: string) => {
    return str.toUpperCase().includes(query.toUpperCase().trim());
  }, [query]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (status) {
        case StatusTodos.ACTIVE:
          return !todo.completed && getCheckQuery(todo.title);

        case StatusTodos.COMPLETED:
          return todo.completed && getCheckQuery(todo.title);

        default:
          return getCheckQuery(todo.title);
      }
    });
  }, [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                onQueryChange={setQuery}
                onStatusChanged={setStatus}
              />
            </div>

            <div className="block">
              {
                isTodosLoaded
                  ? (
                    <TodoList
                      todos={filteredTodos}
                      selectedTodoId={todoId}
                      selectTodo={(todoID: number) => {
                        setTodoId(todoID);
                      }}
                    />
                  )
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0 && (
        <TodoModal
          todo={todos.find(todo => todo.id === todoId)}
          onClose={() => setTodoId(0)}
        />
      )}

    </>
  );
};
