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
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filteredTodos, setFilteredTodos] = useState('all');

  useEffect(() => {
    getTodos().then(todos => setSelectedTodos(todos));
    setLoadingTodos(false);
  }, []);

  const todosWithFilter = () => {
    switch (filteredTodos) {
      case 'active':
        return selectedTodos.filter(todo => !todo.completed);

      case 'completed':
        return selectedTodos.filter(todo => todo.completed);

      case 'all':
      default:
        return selectedTodos;
    }
  };

  const todosWithQuery = () => {
    if (query === '') {
      return todosWithFilter();
    }

    const filteredTodosWithFilter = todosWithFilter();

    return filteredTodosWithFilter.filter(todo => (
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())));
  };

  const visibleTodos = todosWithQuery();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filteredTodos={filteredTodos}
                onChangeQuery={setQuery}
                onChangeFilter={setFilteredTodos}
              />
            </div>

            <div className="block">
              {(!loadingTodos)
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelectedTodo={setSelectedTodo}
                  />
                ) : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
        />
      )}

    </>
  );
};
