/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchList = async () => {
      setIsLoading(true);

      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (error) {
        Error('Sorry, something went wrong with todos loading');
      }
    };

    fetchList();
  }, []);

  const filteredTodos = useMemo<Todo[]>(() => {
    return todos.filter((todo: Todo) => {
      const lowerCaseInput = query.toLowerCase();
      const lowerCaseDesc = todo.title.toLowerCase();

      switch (selectedFilter) {
        case 'active':
          return !todo.completed && lowerCaseDesc.includes(lowerCaseInput);

        case 'completed':
          return todo.completed && lowerCaseDesc.includes(lowerCaseInput);

        default:
          return lowerCaseDesc.includes(lowerCaseInput);
      }
    });
  }, [selectedFilter, query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                query={query}
                setQuery={(searchText: string) => setQuery(searchText)}
              />
            </div>

            <div className="block">
              {!isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={todoId}
                  setTodoId={setTodoId}
                  setUserId={setUserId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoId > 0 && (
        <TodoModal
          userId={userId}
          setUserId={(id: number) => setUserId(id)}
          todos={todos}
          selectedTodoId={todoId}
          selectTodo={(id: number) => setTodoId(id)}
        />
      )}
    </>
  );
};
