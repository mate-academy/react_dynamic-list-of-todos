import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { SelectedStatus } from './types/SelectedStatus';
import { filterTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(SelectedStatus.ALL);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [hasErrorFromServer, setHasErrorFromServer] = useState(false);

  const selectedTodo = useMemo((): Todo | undefined => {
    return todos.find(todo => todo.id === selectedTodoId);
  }, [todos, selectedTodoId]);

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

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const todosToShow = filterTodos(todos, selectedStatus, searchQuery);

    setVisibleTodos(todosToShow);
  }, [todos, selectedStatus, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                setSearchQuery={() => setSearchQuery}
                selectedStatus={selectedStatus}
                setSelectedStatus={() => setSelectedStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {hasErrorFromServer
                ? <p>Error while fetching</p>
                : (
                  <TodoList
                    todos={visibleTodos}
                    setSelectedTodoId={() => setSelectedTodoId}
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
          setSelectedTodoId={() => setSelectedTodoId}
        />
      )}
    </>
  );
};
