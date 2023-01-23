/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
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
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const selectTodo = (todoId:number) => {
    setSelectedTodoId(todoId);
  };

  const selectedTodo = useMemo(() => {
    return todos.find(todo => todo.id === selectedTodoId);
  }, [selectedTodoId, todos]);

  const closeModal = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const visibleTodos = useMemo(() => {
    return (status !== 'all' || query)
      ? (todos.filter(todo => {
        const preparedTitle = todo.title.toLowerCase();
        const preparedQuery = query.toLowerCase().trim();

        const filterByTitle = preparedTitle.includes(preparedQuery);

        switch (status) {
          case 'completed':
            return filterByTitle && todo.completed;

          case 'active':
            return filterByTitle && !todo.completed;

          default:
            return filterByTitle && todo;
        }
      })
      ) : todos;
  }, [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={handleInputChange}
                setStatus={setStatus}
                status={status}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    selectTodo={selectTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
