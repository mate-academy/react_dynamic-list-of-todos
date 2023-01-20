/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterBySelect, setFilterBySelect] = useState<string>('all');

  let visibleTodos = todos;

  if (filterBySelect !== 'all' || searchQuery) {
    visibleTodos = todos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();
      const normalizedQuery = searchQuery.toLowerCase().trim();
      const isQueryMatched = normalizedTitle.includes(normalizedQuery);

      let isFilterBySelectMatched = null;

      switch (filterBySelect) {
        case 'active':
          isFilterBySelectMatched = todo.completed === false;
          break;

        case 'completed':
          isFilterBySelectMatched = todo.completed === true;
          break;

        default:
          isFilterBySelectMatched = true;
          break;
      }

      return isQueryMatched && isFilterBySelectMatched;
    });
  }

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todo => {
        return setTodos(todo);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onCloseModal = () => {
    setSelectedTodoId(0);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                setQuery={(value: string) => setSearchQuery(value)}
                filter={filterBySelect}
                setFilter={(value: string) => setFilterBySelect(value)}
              />
            </div>

            <div className="block">
              {isLoading && (<Loader />)}
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodoId}
                selectTodo={(id: number) => setSelectedTodoId(id)}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          onClose={onCloseModal}
          selectedTodo={selectedTodo}
        />
      )}

    </>
  );
};
