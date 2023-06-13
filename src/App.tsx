/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [filterToDo, setFilterToDo] = useState('all');

  useEffect(() => {
    getTodos().then(todo => {
      setTodos(todo);
    });
  }, []);

  const saveFilterForTodo = (select: React.SetStateAction<string>) => {
    setFilterToDo(select);
  };

  const saveQuery = (input: React.SetStateAction<string>) => {
    setQuery(input);
  };

  const saveTodoId = (id: number | null) => {
    setCurrentTodoId(id);
  };

  const visibleTodos = todos.filter(todo => {
    const isActive = filterToDo === 'active';
    const isCompleted = filterToDo === 'completed';
    const isAll = filterToDo === 'all';

    const matchesQuery = todo.title.toLowerCase().trim()
      .includes(query.toLowerCase().trim());

    return (isActive && !todo.completed && matchesQuery)
      || (isCompleted && todo.completed && matchesQuery)
      || (isAll && matchesQuery);
  });

  const getCurrentTodo = (curId: number) => {
    return visibleTodos.find(todo => todo.id === curId) || null;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                input={query}
                filterForQuery={saveFilterForTodo}
                query={saveQuery}
              />
            </div>

            <div className="block">
              {visibleTodos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={currentTodoId}
                    saveTodoId={saveTodoId}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodoId && (
        <TodoModal
          currentTodo={getCurrentTodo(currentTodoId)}
          saveTodoId={saveTodoId}
        />
      )}

    </>
  );
};
