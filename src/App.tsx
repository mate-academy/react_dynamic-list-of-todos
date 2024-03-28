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
import { TaskStatus } from './types/types';

type FilterOptions = {
  query: string;
  taskStatusFilter: TaskStatus;
};

const getFilteredTodos = (todos: Todo[], options: FilterOptions) => {
  const { query, taskStatusFilter } = options;
  let filteredTodos = [...todos];

  const normalizeStr = (str: string): string => str.trim().toLowerCase();

  if (query) {
    filteredTodos = todos.filter(todo =>
      normalizeStr(todo.title).includes(normalizeStr(query)),
    );
  }

  if (taskStatusFilter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  if (taskStatusFilter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isTodoArrayLoaded, setIsTodoArrayLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [taskStatusFilter, setTaskStatusFilter] = useState<TaskStatus>('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsTodoArrayLoaded(true));
  }, []);

  const filteredTodos = getFilteredTodos(todos, { query, taskStatusFilter });

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
                setTaskStatusFilter={setTaskStatusFilter}
              />
            </div>

            <div className="block">
              {isTodoArrayLoaded ? (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  selectTodo={setSelectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
