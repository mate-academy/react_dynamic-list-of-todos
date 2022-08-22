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
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredType, setFilteredType] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = (filterType: Filter): Todo[] => {
    return todos.filter(todo => {
      const queryTodos = todo.title.toLowerCase().includes(query.trim().toLowerCase());

      switch (filterType) {
        case 'all':
          return queryTodos;
        case 'active':
          return queryTodos && !todo.completed;
        case 'completed':
          return queryTodos && todo.completed;
        default:
          return true;
      }
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChange={setQuery}
                query={query}
                selectFilter={setFilteredType}
                filterType={filteredType}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={filteredTodos(filteredType)}
                selectTodo={setSelectedTodo}
                selectedTodoId={selectedTodo?.id || null}
                filter={query}
                onLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal todo={selectedTodo} closeModal={setSelectedTodo} />}

    </>
  );
};
