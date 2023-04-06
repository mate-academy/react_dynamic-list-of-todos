import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

function getVisibleTodos(todos: Todo[], query: string, filterBy: string) {
  let visibleTodos = [...todos];

  if (query) {
    const queryLowerCase = query.toLowerCase().trim();

    visibleTodos = visibleTodos.filter(({ title }) => (
      title.toLowerCase().includes(queryLowerCase)));
  }

  if (filterBy !== Filter.All) {
    visibleTodos = visibleTodos.filter(({ completed }) => {
      switch (filterBy) {
        case Filter.Active:
          return !completed;
        case Filter.Completed:
          return completed;
        default:
          return true;
      }
    });
  }

  return visibleTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<Filter>(Filter.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  const todosToShow = getVisibleTodos(todos, query, filterBy);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeQuery={setQuery}
                onChangeFilter={setFilterBy}
              />
            </div>
            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={todosToShow}
                selectTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
