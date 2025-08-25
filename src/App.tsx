/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
//import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

type TodoStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchByState, setSearchByState] = useState<TodoStatus>('all');
  const [searchByTitle, setSearchByTitle] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(error => console.error('Error loading todos:', error))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    // фільтр по статусу
    if (searchByState === 'active' && todo.completed) {
      return false;
    }

    if (searchByState === 'completed' && !todo.completed) {
      return false;
    }

    // фільтр по назві
    if (
      searchByTitle &&
      !todo.title.toLowerCase().includes(searchByTitle.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchByState={searchByState}
                searchByTitle={searchByTitle}
                setSearchByState={setSearchByState}
                setSearchByTitle={setSearchByTitle}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          isLoadingUser={isLoadingUser}
          setIsLoadingUser={setIsLoadingUser}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
