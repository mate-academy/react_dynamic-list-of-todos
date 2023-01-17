/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Request } from './components/Request';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const { All, Active, Completed } = Filter;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>(All);
  const [query, setQuery] = useState('');

  const todosPoint = 'todos';

  useEffect(() => {
    Request(todosPoint)
      .then(data => setTodos(data));
  }, []);

  const filterTodos = useMemo(() => todos.filter((e) => {
    switch (selectedFilter) {
      case Completed:
        return e.completed === true;
      case Active:
        return e.completed === false;
      default:
        return e;
    }
  }), [selectedFilter, todos]);

  const filterTodosByQuery = useMemo(() => filterTodos.filter((e) => e.title.includes(query.toLowerCase())), [query, filterTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={(phrase) => setQuery(phrase)}
                setSelectedFilter={(filter: string) => setSelectedFilter(filter)}
              />
            </div>

            <div className="block">
              {/* <Loader /> */}
              {todos.length > 0 ? (
                <TodoList
                  todos={filterTodosByQuery}
                  setSelectedTodo={(todo: Todo) => setSelectedTodo(todo)}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={(todo: null) => setSelectedTodo(todo)}
        />
      )}
    </>
  );
};
