import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [
    selectedTodoCard,
    setSelectedTodoCard,
  ] = React.useState<Todo | null>(null);
  const [filterOption, setfilterOption] = React.useState<string>('all');
  const [query, setQuery] = React.useState<string>('');

  useEffect(() => {
    getTodos().then(response => setTodos(response));
  }, []);

  const filterTodos = useMemo(() => {
    return todos.filter(todo => {
      const todoTitle = todo.title
        .toLowerCase()
        .includes(query.toLowerCase().trim());

      switch (filterOption) {
        case 'active':
          return !todo.completed && todoTitle;
        case 'completed':
          return todo.completed && todoTitle;
        default:
          return todoTitle;
      }
    });
  }, [todos, filterOption, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterOption={filterOption}
                setFilterOption={setfilterOption}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={filterTodos}
                    selectedTodoCard={selectedTodoCard}
                    setSelectedTodoCard={setSelectedTodoCard}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoCard && (
        <TodoModal
          selectedTodoCard={selectedTodoCard}
          setSelectedTodoCard={setSelectedTodoCard}
        />
      )}
    </>
  );
};
