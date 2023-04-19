/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { filterByTitle, filterByTodoStatus } from './helpers';
import { Loader } from './components/Loader';
import { LoadError } from './types/ErrorType';
import { LoadingError } from './components/LoadingError/LoadingError';
import { TodosFilterType } from './types/TodosFilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState(TodosFilterType.Default);
  const [query, setQuery] = useState('');
  const [isLoading, isSetLoading] = useState(false);
  const [isLoadingError, isSetLoadingError] = useState(false);

  useEffect(() => {
    isSetLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => isSetLoadingError(true))
      .finally(() => isSetLoading(false));
  }, []);

  let visibleTodos = filterByTodoStatus(todos, filterBy);

  visibleTodos = filterByTitle(visibleTodos, query);

  useEffect(() => {
    const selectTodo = visibleTodos.find(todo => todo.id === selectedTodoId);

    if (selectTodo) {
      setSelectedTodo(selectTodo);
      setShowTodoModal(true);
    }
  }, [selectedTodoId]);

  const closeTodoModal = () => {
    setSelectedTodoId(0);
    setShowTodoModal(false);
  };

  const handleClearField = () => {
    setQuery('');
  };

  const shouldShowTodoModal = selectedTodo && showTodoModal;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeFilterBy={setFilterBy}
                query={query}
                changeQuery={setQuery}
                onClearField={handleClearField}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <>
                    {isLoadingError
                      ? <LoadingError text={LoadError.LoadingError} />
                      : (
                        <TodoList
                          todos={visibleTodos}
                          selectedTodoId={selectedTodoId}
                          setSelectedTodoId={setSelectedTodoId}
                        />
                      )}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>

      {shouldShowTodoModal && (
        <TodoModal
          closeModal={closeTodoModal}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
