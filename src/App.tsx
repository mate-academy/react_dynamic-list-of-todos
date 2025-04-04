/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                allTodos={todos}
                setFilteredTodos={setFilteredTodos}
              />
            </div>

            <div className="block">
              <TodoList
                todos={filteredTodos}
                setTodos={setTodos}
                setIsLoading={setIsTodosLoading}
                setIsModalOpen={setIsModalOpen}
                setIsModalLoading={setIsModalLoading}
                setUser={setUser}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
              {isTodosLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        user={user}
        selectedTodo={selectedTodo}
        isLoading={isModalLoading}
        isModalOpen={isModalOpen}
        setSelectedTodo={setSelectedTodo}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
