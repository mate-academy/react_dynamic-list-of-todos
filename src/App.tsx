/* eslint-disable max-len */
import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [input, setInput] = useState('');
  const [selector, setSelector] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const closeTodoModal = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const handleSelectTodo = useCallback((id:number) => {
    setSelectedTodoId(id);
  }, []);

  const handleChangeQuery = useCallback((word: string) => {
    setInput(word);
  }, []);

  const handleChangeSelector = useCallback((option: string) => {
    setSelector(option);
  }, []);

  const handleDeleteQueryText = useCallback(() => {
    setInput('');
  }, []);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const selectedTodo = useMemo(() => todos.find(todo => todo.id === selectedTodoId), [selectedTodoId]);

  const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(input.toLowerCase()));

  let visibleTodos = filteredTodos;

  if (selector === 'active') {
    visibleTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (selector === 'completed') {
    visibleTodos = filteredTodos.filter(todo => todo.completed);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={input}
                onSearchQueryChange={handleChangeQuery}
                selector={selector}
                onSelectorChange={handleChangeSelector}
                onDeleteButtonClick={handleDeleteQueryText}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              )
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={handleSelectTodo}
                    selectTodoId={selectedTodoId}
                  />
                )}
              {isError && (
                <p>Something went wrong</p>
              )}

              {!visibleTodos.length && (
                <p>No todos matched filters</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClickCloseTodoModal={closeTodoModal}
        />
      )}
    </>
  );
};
