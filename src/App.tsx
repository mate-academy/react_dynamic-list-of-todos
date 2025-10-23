/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';



export const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);


  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  const vilibleTodos = todos.filter(todo => {
    const statusMatch = 
    status === 'all' ||
    (status === 'active' && !todo.completed) ||
    (status === 'completed' && todo.completed);

    const titleMatch = todo.title.toLocaleLowerCase().includes(query.toLowerCase());

    return statusMatch && titleMatch;
  });


  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoadingTodos(false));
  }, []);


  const getSelectedTodo = (): Todo | undefined => {
    return todos.find(todo => todo.id === selectedTodoId);
  };


  const handleShowTodo = (todo: Todo) => {
    setSelectedTodoId(todo.id);
    setIsModalOpen(true);


    setIsUserLoading(true);
    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => setIsUserLoading(false));
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodoId(null);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter 
              query={query}
              onQuaryChange={setQuery}
              status={status}
              onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList 
                todos={vilibleTodos} 
                onShow={handleShowTodo} 
                selectedTodoId={selectedTodoId}/>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
  <TodoModal
    todo={getSelectedTodo()}
    user={selectedUser}
    isLoading={isUserLoading}
    onClose={handleCloseModal}
  />
  )}
    </>
  );
};