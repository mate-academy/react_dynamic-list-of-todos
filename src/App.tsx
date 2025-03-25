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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [onSelect, setOnSelect] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const getVisibleTodos = (
    todosList: Todo[],
    queryToFilter: string,
    onSelectOption: string,
  ) => {
    let filteredTodos = [...todosList];

    if (queryToFilter) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(queryToFilter.toLowerCase().trim()),
      );
    }

    switch (onSelectOption) {
      case 'active':
        return filteredTodos.filter(todo => !todo.completed);
      case 'completed':
        return filteredTodos.filter(todo => todo.completed);
      default:
        return filteredTodos;
    }
  };

  const visibleTodos = getVisibleTodos(todos, query, onSelect);

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
                onSelect={setOnSelect}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  selectTodo={todo => setSelectedTodo(todo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
