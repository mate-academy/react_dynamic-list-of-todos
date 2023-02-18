/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [hasErrorFromServer, setHasErrorFromServer] = useState(false);

  const selectedTodo = useMemo((): Todo | undefined => {
    return todos.find(todo => todo.id === selectedTodoId);
  }, [todos, selectedTodoId]);

  useEffect(() => {
    const fetchTodos = async () => {
      setHasErrorFromServer(false);
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
        setIsLoading(false);
      } catch {
        setHasErrorFromServer(true);
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const filterTodos = () => {
      const queryToLowerCase = searchQuery.toLowerCase();

      let todosToShow = todos.filter(todo => {
        switch (selectedStatus) {
          case 'all':
            return true;
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      });

      if (searchQuery) {
        todosToShow = todosToShow.filter(todo => todo.title.toLowerCase().includes(queryToLowerCase));
      }

      setVisibleTodos(todosToShow);
    };

    filterTodos();
  }, [selectedStatus, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {hasErrorFromServer
                ? <p>Error while fetching</p>
                : (
                  <TodoList
                    todos={visibleTodos}
                    setSelectedTodoId={setSelectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedTodoId={selectedTodoId}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
