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
import { CompletionFilter } from './types/CompletionFilter';

function filterByQuery(todos: Todo[], searchQuery: string) {
  const normalisedQuery = searchQuery.toLowerCase().trim();

  return todos.filter(({ title }) => title.toLowerCase().includes(normalisedQuery));
}

function filterByCompletion(todos: Todo[], completionParam: CompletionFilter) {
  if (completionParam === CompletionFilter.All) {
    return todos;
  }

  const completionStatus = completionParam === CompletionFilter.Completed;

  return todos.filter(({ completed }) => completed === completionStatus);
}

function postsFilter(dataToFilter: Todo[], completionParam: CompletionFilter, searchQuery: string) {
  let filteredTodos = dataToFilter;

  filteredTodos = filterByQuery(filteredTodos, searchQuery);
  filteredTodos = filterByCompletion(filteredTodos, completionParam);

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [completionFilter, setCompletionFilter] = useState<CompletionFilter>(CompletionFilter.All);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoaderVisible(true);

    getTodos()
      .then((todoList) => {
        setTodosFromServer(todoList);
      })
      .finally(() => setIsLoaderVisible(false));
  }, []);

  useEffect(() => {
    setFilteredTodos(postsFilter(todosFromServer, completionFilter, searchQuery));
  }, [todosFromServer, completionFilter, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                changeSearchQuery={setSearchQuery}
                completionStatus={completionFilter}
                changeCompletionStatus={setCompletionFilter}
              />
            </div>

            <div className="block">
              {isLoaderVisible
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    changeSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          changeSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
