/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    getTodos()
      .then(todo => setTodos(todo));
  }, []);

  const closeTodoModal = () => {
    setSelectedTodoId(0);
  };

  const visibleTodos = todos.filter(todo => {
    const isSearchQuery = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

    let searchSelect;

    switch (selectedFilter) {
      case 'completed':
        searchSelect = todo.completed;
        break;

      case 'active':
        searchSelect = !todo.completed;
        break;

      case 'all':
        return isSearchQuery;

      default:
        break;
    }

    return isSearchQuery && searchSelect;
  });

  const selectedTodo = visibleTodos.find(
    todo => todo.id === selectedTodoId,
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                searchQuery={searchQuery}
                onSelectedFilter={(option) => setSelectedFilter(option)}
                onSearchQuery={(title) => setSearchQuery(title)}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectTodoId={(todoId) => setSelectedTodoId(todoId)}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : <Loader /> }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal onCloseModal={closeTodoModal} todo={selectedTodo} />
      )}
    </>
  );
};
