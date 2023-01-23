import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('all');

  useEffect(() => {
    getTodos()
      .then((loadedTodos) => setTodos(loadedTodos));
  }, []);

  const selectTodoId = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const visibleTodos = todos.filter(todo => {
    const normalizedTitle = todo.title.toLowerCase();
    const normalizedQuery = query.toLowerCase();
    const isTitleIncludesQuery = normalizedTitle.includes(normalizedQuery);

    switch (searchBy) {
      case 'completed':
        return todo.completed && isTitleIncludesQuery;

      case 'active':
        return !todo.completed && isTitleIncludesQuery;

      case 'all':
        return isTitleIncludesQuery;

      default:
        return isTitleIncludesQuery;
    }
  });

  const selectedTodo = visibleTodos.find(
    todo => todo.id === selectedTodoId,
  );

  const unselectUser = () => {
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
                setQuery={setQuery}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
              />
            </div>

            <div className="block">
              {visibleTodos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onSelect={selectTodoId}
                  />
                )
                : (<Loader />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeTodoModal={unselectUser}
        />
      )}
    </>
  );
};
