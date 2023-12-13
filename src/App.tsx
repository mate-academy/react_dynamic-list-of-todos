/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodosToRender } from './helpers';
import { ProgressStatus } from './types/ProgressEnum';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [progress, setProgress] = useState<ProgressStatus>(ProgressStatus.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const closeModal = () => setSelectedTodo(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch()
      .finally(() => setIsLoading(false));
  }, []);

  const todosToRender = getTodosToRender(todos, searchQuery, progress);

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
                progress={progress}
                setProgress={setProgress}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={todosToRender}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={closeModal}
        />
      )}
    </>
  );
};
