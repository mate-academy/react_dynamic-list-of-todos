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
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User>();
  const [userId, setUserId] = useState<number | null>(null);
  const [todoId, setTodoId] = useState<number | null>(null);
  const [todoTitle, setTodoTitle] = useState<string | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    getTodos().then(data => {
      setAllTodos(data);
      setTodos(data);
    });
    if (userId) {
      getUser(userId).then(data => {
        setUser(data);
      });
    }
  }, [userId]);

  function filterTodos(searchTerm: string, status: boolean | null) {
    let filtered = allTodos;

    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (status !== null) {
      filtered = filtered.filter(todo => todo.completed === status);
    }

    setTodos(filtered);
  }

  function modalTodoOpen(userIds: number, todoIds: number, todoTitles: string) {
    setIsModal(true);
    setTodoId(todoIds);
    setUserId(userIds);
    setTodoTitle(todoTitles);
    setSelectedTodoId(todoIds);
  }

  function modalTodoClose() {
    setIsModal(false);
    setSelectedTodoId(null);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filterTodos={filterTodos} />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={todos}
                modalTodo={modalTodoOpen}
                selectedTodoId={selectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>
      {isModal && (
        <TodoModal
          userName={user?.name}
          todoId={todoId}
          todoTitle={todoTitle}
          onClose={modalTodoClose}
        />
      )}
    </>
  );
};
