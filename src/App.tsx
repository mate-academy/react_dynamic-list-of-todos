/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTodos, setActiveTodos] = useState<number | null>(null);

  useEffect(() => {
    setLoader(true);

   
      getTodos()
        .then(todos => {
          setTodoList(todos);
          setFilteredTodos(todos);
        })
        .finally(() => setLoader(false));
  
  }, []);

  useEffect(() => {
    let updatedTodos = [...todoList];

    if (filterOption === 'active') {
      updatedTodos = updatedTodos.filter(todo => !todo.completed);
    } else if (filterOption === 'completed') {
      updatedTodos = updatedTodos.filter(todo => todo.completed);
    }

    if (searchQuery) {
      updatedTodos = updatedTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTodos(updatedTodos);
  }, [filterOption, searchQuery, todoList]);

  useEffect(() => {
    if (selectedTodo?.userId) {
      getUser(selectedTodo.userId)
        .then(user => setSelectedUser(user))
        .catch(() => setSelectedUser(null));
    } else {
      setSelectedUser(null);
    }
  }, [selectedTodo]);

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
    setActiveTodos(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getOption={setFilterOption}
                getSearch={setSearchQuery}
                clearSearch={setSearchQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              <TodoList
                todoList={filteredTodos}
                onSelect={setSelectedTodo}
                selectedTodoId={activeTodos}
                setActiveTodos={setActiveTodos}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          del={handleCloseModal}
        />
      )}
    </>
  );
};
