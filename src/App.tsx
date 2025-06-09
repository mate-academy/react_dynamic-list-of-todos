/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import * as api from './api';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const delayTimer = setTimeout(() => setLoading(true), 200);
    const todosPromise = api
      .getTodos()
      .then(setTodos)
      .finally(() => clearTimeout(delayTimer));
    const timerPromise = new Promise(resolve => setTimeout(resolve, 500));

    Promise.allSettled([todosPromise, timerPromise]).finally(() =>
      setLoading(false),
    );
  }, []);

  const onTodoSelected = (todo: Todo) => {
    setActiveTodo(todo);
    setIsTodoOpen(true);
  };

  const onTodoClosed = () => {
    setActiveTodo(null);
    setIsTodoOpen(false);
  };

  const onFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const onInputValueChange = (newInput: string) => {
    setInputValue(newInput);
  };

  const filterTodosByStatus = () => {
    switch (filter) {
      case 'active':
        return todos.filter(currentTodo => !currentTodo.completed);
      case 'completed':
        return todos.filter(currentTodo => currentTodo.completed);
      default:
        return todos;
    }
  };

  const filterTodosByInput = (currentTodos: Todo[]) => {
    return currentTodos.filter(todo =>
      todo.title.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const filteredTodos = filterTodosByStatus();
  const visibleTodos = filterTodosByInput(filteredTodos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={onFilterChange}
                onInputValueChange={onInputValueChange}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelected={onTodoSelected}
                  activeTodo={activeTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isTodoOpen && (
        <TodoModal selectedTodo={activeTodo} onClosed={onTodoClosed} />
      )}
    </>
  );
};
