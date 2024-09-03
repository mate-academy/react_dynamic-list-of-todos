/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { FilterStatusType, Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

function filterTodos(
  todos: Todo[],
  query: string,
  filterStates: FilterStatusType,
) {
  let filteredTasks = [...todos].filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase().trim()),
  );

  filteredTasks = filteredTasks.filter(todo => {
    switch (filterStates) {
      case FilterStatusType.All:
        return true;
      case FilterStatusType.Active:
        return !todo.completed;
      case FilterStatusType.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return filteredTasks;
}

export const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterStates, setFilterStatus] = useState<FilterStatusType>(
    FilterStatusType.All,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const todoList = filterTodos(todo, query, filterStates);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todoFromServer => {
        setTodo(todoFromServer);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                setFilterStatus={setFilterStatus}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todoList.length > 0 && (
                <TodoList
                  todos={todoList}
                  setChoiceTodo={setSelectedTodo}
                  choiceTodo={selectedTodo}
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
