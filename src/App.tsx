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
import { FilterType } from './types/FilterType';

const baseTodo: Todo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

const filterTodos = (sourceTodos: Todo[], filterBy: FilterType, currentQuery: string) => {
  let filteredTodos: Todo[];

  switch (filterBy) {
    case FilterType.Active:
      filteredTodos = sourceTodos.filter(todo => !todo.completed);
      break;

    case FilterType.Completed:
      filteredTodos = sourceTodos.filter(todo => todo.completed);
      break;

    default:
      filteredTodos = [...sourceTodos];
      break;
  }

  if (currentQuery) {
    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLowerCase().includes(currentQuery.toLowerCase()));
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([baseTodo]);
  const [selectedTodo, setSelectedTodo] = useState(baseTodo);
  const [isListLoading, setIsListLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterByStatus, setFilterByStatus] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    setIsListLoading(true);
    getTodos().then(setTodos).finally(() => setIsListLoading(false));
  }, []);

  const filteredTodos = filterTodos(todos, filterByStatus, query);

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
                filterByStatus={filterByStatus}
                setFilterByStatus={setFilterByStatus}
              />
            </div>

            <div className="block">
              {isListLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {(selectedTodo !== baseTodo) && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={() => {
            setSelectedTodo(baseTodo);
          }}
        />
      )}
    </>
  );
};
