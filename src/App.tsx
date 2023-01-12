import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import './App.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completeTodoFilter, setCompleteTodoFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const prettyQuery = query.toLowerCase().trim();

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  let visibleTodos = [...todos];

  switch (completeTodoFilter) {
    case (FilterType.active):
      visibleTodos = [...todos].filter(el => el.completed === false);
      break;

    case FilterType.completed:
      visibleTodos = [...todos].filter(el => el.completed === true);
      break;

    default:
      visibleTodos = [...todos];
  }

  const visibleFilteredTodos = (allTodos: Todo[]) => {
    return allTodos.filter(todo => todo.title
      .toLowerCase().includes(prettyQuery));
  };

  const preparedTodos = visibleFilteredTodos(visibleTodos);

  const selectedTodo = todos.find(el => el.id === selectedTodoId) || null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                completeTodoFilter={completeTodoFilter}
                setCompleteTodoFilter={setCompleteTodoFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    preparedTodos={preparedTodos}
                    setSelectedTodoId={setSelectedTodoId}
                    selectedTodoId={selectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      { selectedTodoId && (
        <TodoModal
          setSelectedTodosId={setSelectedTodoId}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
