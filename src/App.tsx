/* eslint-disable max-len */
import React, {
  useMemo,
  useEffect,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { LoadType } from './types/LoadType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [typeOfLoad, setTypeOfLoad] = useState(LoadType.All);

  useEffect(() => {
    const getTodosFromServer = async () => {
      setIsLoading(true);

      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getTodosFromServer();
  }, []);

  const visibleTodos = useMemo(() => {
    let filtered = todos;

    if (query) {
      filtered = filtered.filter(todo => (
        todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ));
    }

    switch (typeOfLoad) {
      case LoadType.Completed:
        filtered = filtered.filter(todo => (
          todo.completed
        ));
        break;

      case LoadType.Active:
        filtered = filtered.filter(todo => (
          !todo.completed
        ));
        break;

      default:
        break;
    }

    return filtered;
  }, [query, LoadType, isLoading]);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [selectedTodoId]);

  const handleSelectTodo = (id: number) => {
    setSelectedTodoId(id);
  };

  const handleCloseModal = () => {
    setSelectedTodoId(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeQuery={setQuery}
                onChangeTypeOfLoad={setTypeOfLoad}
              />
            </div>

            <div className="block">
              {isLoading && !isError
                ? (
                  <Loader />
                ) : (
                  <p style={{ color: 'red' }}>
                    Ooops... Something went wrong.
                  </p>
                )}

              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodoId}
                handleSelectTodo={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
