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
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Status } from './types/Status';

export const getTodoStatus = (type: string) => {
  switch (type) {
    case Status.Active:
      return Status.Active;

    case Status.Completed:
      return Status.Completed;

    case Status.All:
    default:
      return Status.All;
  }
};

export const getTodosByStatus = (todos: Todo[], status: Status) => {
  return [...todos].filter(todo => {
    if (status === Status.Completed) {
      return todo.completed;
    }

    if (status === Status.Active) {
      return !todo.completed;
    }

    return todo;
  });
};

export const getFilteredTodos = (todos: Todo[], query: string) => {
  return [...todos].filter(todo => {
    const lowerCaseTodoTitle = todo.title.toLocaleLowerCase();
    const lowerCaseQuery = query.toLocaleLowerCase();

    return lowerCaseTodoTitle.includes(lowerCaseQuery);
  });
};

export const filteredTodods = (type: string) => {
  switch (type) {
    case Status.Active:
      return Status.Active;

    case Status.Completed:
      return Status.Completed;

    case Status.All:
    default:
      return Status.All;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState('');

  const loadTodos = useCallback(
    async () => {
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch {
        setTodos([]);
      }
    }, [getTodos],
  );

  useEffect(() => {
    loadTodos();
  }, []);

  const handleChangeInput = useMemo(() => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setQuery(value);
    };
  }, [query]);

  const clearInput = useMemo(() => {
    return () => {
      setQuery('');
    };
  }, [query]);

  const handleChangeSelect = useMemo(() => {
    return (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      setStatus(getTodoStatus(value));
    };
  }, [status]);

  const closeModal = useMemo(() => {
    return () => {
      setTodoId(0);
    };
  }, [todoId]);

  const visibleTodos = useMemo(() => {
    const filteredTodos = getFilteredTodos(todos, query);
    const todosByStatus = getTodosByStatus(filteredTodos, status);

    return todosByStatus;
  }, [todos, status, query]);

  const currentTodo = todos.find(todo => todoId === todo.id);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onHandleSelect={handleChangeSelect}
                query={query}
                onHandleInput={handleChangeInput}
                onClear={clearInput}
              />
            </div>

            <div className="block">
              {todos.length < 1
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={(selectedTodoId) => {
                      setTodoId(selectedTodoId);
                    }}
                    selectedTodoId={todoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          currentTodo={currentTodo}
          OnCloseModal={closeModal}
        />
      )}
    </>
  );
};
