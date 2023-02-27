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
import { getVisibleTodos } from './helpers/getVisibleTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [statusOption, setStatusOption] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    try {
      getTodos()
        .then(setTodos);
    } catch (error) {
      setTodos([]);
    }
  }, []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [selectedTodoId]);

  const handleCloseModal = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const visibleTodos = getVisibleTodos(todos, query, statusOption);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={statusOption}
                changeStatus={setStatusOption}
                query={query}
                updateQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    selectNewTodo={setSelectedTodoId}
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
          closeModal={handleCloseModal}
        />
      )}
    </>
  );
};
