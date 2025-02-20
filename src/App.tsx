/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useEffect, useState } from 'react';

import { getTodos, getUser } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState('all');
  const [searchItem, setSearchItem] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editItem, setEditItem] = useState<Todo | null>(null);
  const [user, setUser] = useState<User>();

  const handleOnSearchItem = (search: string) => {
    setSearchItem(search);
  };

  const handleEditItem = (id: number) => {
    const toEdit = todos.find(todo => todo.id === id);

    setEditItem(toEdit!);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const fetchData = await getTodos();
        let filteredTodos = fetchData;

        if (selected !== 'all') {
          filteredTodos = fetchData.filter((todo: Todo) => {
            if (selected === 'active' && !todo.completed) {
              return true;
            }

            if (selected === 'completed' && todo.completed) {
              return true;
            }

            return false;
          });
        }

        if (searchItem.trim() !== '') {
          filteredTodos = filteredTodos.filter((todo: Todo) =>
            todo.title.toLowerCase().includes(searchItem.toLowerCase()),
          );
        }

        setTodos(filteredTodos);
      } catch (error) {
        // console.error('Error fetching todos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [selected, searchItem]);

  useEffect(() => {
    if (editItem !== null) {
      const fetchUser = async () => {
        const userData = await getUser(editItem.userId);

        setUser(userData);
      };

      if (editItem.userId) {
        fetchUser();
      }
    }
  }, [editItem]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchItem={searchItem}
                selected={selected}
                setSelected={setSelected}
                handleOnSearchItem={handleOnSearchItem}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todos?.length > 0 && (
                <TodoList
                  todos={todos}
                  handleEditItem={handleEditItem}
                  editItem={editItem}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {editItem !== null && (
        <TodoModal user={user} editItem={editItem} setEditItem={setEditItem} />
      )}
    </>
  );
};
