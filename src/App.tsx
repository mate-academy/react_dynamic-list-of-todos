/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodosFilterBy } from './types/TodosFilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [filterTodosBy, setFilterTodosBy] = useState<TodosFilterBy>(TodosFilterBy.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  const preparedTodos = useMemo(() => {
    const LowerQuery = query.toLowerCase().trim();
    let newTodos = [...todos];

    if (filterTodosBy) {
      switch (filterTodosBy) {
        case TodosFilterBy.ACTIVE:
          newTodos = [...todos].filter(todo => !todo.completed);
          break;
        case TodosFilterBy.COMPLETED:
          newTodos = [...todos].filter(todo => todo.completed);
          break;
        default:
          newTodos = [...todos];
      }
    }

    if (query) {
      newTodos = newTodos.filter(todo => {
        const lowerTitle = todo.title.toLowerCase().trim();

        return lowerTitle.includes(LowerQuery);
      });
    }

    return newTodos;
  }, [todos, filterTodosBy, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterTodosBy={filterTodosBy}
                setFilterTodosBy={setFilterTodosBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!todos.length && (
                <Loader />
              )}
              <TodoList
                todos={preparedTodos}
                selectedTodoId={selectedTodoId}
                setSelectedTodoId={setSelectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal />
      )}
    </>
  );
};
