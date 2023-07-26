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
import { SortKeys } from './enum';
import { getPreperedTodos } from './utils/filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [filter, setFilter] = useState('');
  const [select, setSelect] = useState(SortKeys.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  async function getAllTodos() {
    setLoader(true);
    try {
      const allTodos = await getTodos();

      setTodos(allTodos);
    } catch (error) {
      throw new Error(error as string);
    } finally {
      setLoader(false);
    }
  }

  async function getUserById() {
    if (selectedTodo === null) {
      return;
    }

    try {
      const userData = await getUser(selectedTodo?.userId);

      setUser(userData);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  useEffect(() => {
    getAllTodos();
  }, []);

  useEffect(() => {
    getUserById();
  }, [selectedTodo?.id, user?.id]);

  const preperedTodos = useMemo(() => {
    return getPreperedTodos(
      todos,
      filter,
      select,
    );
  }, [todos, filter, select]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onFilter={setFilter}
                select={select}
                onSelect={setSelect}
              />
            </div>

            <div className="block">
              {!loader && (
                <TodoList
                  todos={preperedTodos}
                  todoId={selectedTodo?.id || 0}
                  onSelectedTodo={setSelectedTodo}
                />
              )}
              {loader && <Loader />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          onUser={setUser}
          onSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
