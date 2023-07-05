/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCompleted, setIsCompleted] = useState('all');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(true);
      });
  }, []);

  let visibleTodos = [...todos];

  if (searchQuery) {
    visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase().includes(searchQuery));
  }

  const filterByStatus = (todosList: Todo[], todoStatus: boolean) => (
    todosList.filter(todo => todo.completed === todoStatus)
  );

  if (isCompleted === 'completed') {
    visibleTodos = filterByStatus(visibleTodos, true);
  }

  if (isCompleted === 'active') {
    visibleTodos = filterByStatus(visibleTodos, false);
  }

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const clearSelectTodo = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isCompleted={isCompleted}
                setIsCompleted={setIsCompleted}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelect={selectTodo}
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
          onClose={clearSelectTodo}
        />
      )}
    </>
  );
};
