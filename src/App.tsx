/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedParam, setSelectedParam] = useState<string>('all');
  const [inputParam, setInputParam] = useState<string>('');
  const [isTodosLoading, setIsTodosLoading] = useState<boolean>(false);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  const filteredBySelected = useMemo(() => {
    return [...todos].filter((todo: Todo) => {
      if (selectedParam === 'completed') {
        return todo.completed === true;
      }

      if (selectedParam === 'active') {
        return todo.completed === false;
      }

      return todo;
    });
  }, [todos, selectedParam]);

  const filteredTodos = useMemo(() => {
    return [...filteredBySelected].filter((todo: Todo) => {
      return todo.title.toLowerCase().includes(inputParam.toLowerCase());
    });
  }, [inputParam, filteredBySelected]);

  const getTodoData = async () => {
    setIsTodosLoading(true);
    const todoData = await getTodos();
    setTodos(todoData);
    setIsTodosLoading(false);
  };

  const onSelect = (param: string) => {
    setSelectedParam(param);
  };

  const onInput = (param: string) => {
    setInputParam(param);
  };

    const getSelectedUser = async (userId: number | undefined) => {
      if (!userId) {
        return;
      }
      setIsUserLoading(true);
      const userData = await getUser(userId);
      setUser(userData);
      setIsUserLoading(false);
    };

  const handleSelectTodo = (todoId: number | null) => {
    if (todoId === null) {
      setSelectedTodo(null);
      setUser(null);
      setIsUserLoading(false);
      return;
    }
    const foundTodo = todos.find((todo: Todo) => todoId === todo.id) || null;
    setSelectedTodo(foundTodo);
    if (foundTodo) {
      getSelectedUser(foundTodo.userId);
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSelect={onSelect} onInput={onInput} />
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                onSelectTodo={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          user={user}
          isUserLoading={isUserLoading}
          onClose={handleSelectTodo}
        />
      )}
    </>
  );
};
