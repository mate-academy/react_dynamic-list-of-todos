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
  const [todoId, setTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [selector, setSelector] = useState('All');

  const closeTodoModal = useCallback(() => {
    setTodoId(0);
  }, []);

  const handleSetTodo = useCallback((id:number) => {
    setTodoId(id);
  }, []);

  const handleSetQuery = useCallback((word: string) => {
    setQuery(word);
  }, []);

  const handleSetSelector = useCallback((option: string) => {
    setSelector(option);
  }, []);

  const handleDeleteQueryText = useCallback(() => {
    setQuery('');
  }, []);

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const selectedTodo = useMemo(() => todos.find(todo => todo.id === todoId), [todoId]);

  const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

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
                query={query}
                onSearchQueryChange={handleSetQuery}
                selector={selector}
                onSelectorChange={handleSetSelector}
                onDeleteButtonClick={handleDeleteQueryText}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              )
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={handleSetTodo}
                    selectTodoId={todoId}
                  />
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
