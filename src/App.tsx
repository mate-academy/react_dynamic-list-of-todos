import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [filter, setFilter] = useState(Status.all);
  const [query, setQuery] = useState('');
  const getTodoByID = (id: number): Todo => {
    return todos.find(todo => todo.id === id) || todos[0];
  };

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Status.active:
        return !todo.completed;

      case Status.completed:
        return todo.completed;

      default:
        return Status.all;
    }
  });

  const visibleTodos = useMemo(() => {
    if (query.trim()) {
      return filteredTodos.filter(todo => todo.title.toLowerCase()
        .includes(query.toLowerCase()));
    }

    return filteredTodos;
  }, [todos, filter, query]);

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
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodoId}
                  setSelectedTodo={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId !== 0 && (
        <TodoModal
          todo={getTodoByID(selectedTodoId)}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
