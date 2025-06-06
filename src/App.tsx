/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedItem, setSelectedItem] = useState('all');
  const [query, setQuery] = useState('');
  const [hasClicked, setHasClicked] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [choosedItem, setChoosedItem] = useState<Todo | null>(null);

  const onChangeInput = (queryFromChildren: string) => {
    setQuery(queryFromChildren);
  };

  const visibleTodos = useMemo(() => {
    return [...todos].filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [todos, query]);

  const handleSelects = (choosedButton: string) => {
    if (choosedButton === 'all') {
      setSelectedItem('all');
    }

    if (choosedButton === 'active') {
      setSelectedItem('active');
    }

    if (choosedButton === 'completed') {
      setSelectedItem('completed');
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getTodos();

      return data;
    }

    if (selectedItem === 'all') {
      fetchData().then(setTodos);
    } else if (selectedItem === 'active') {
      fetchData().then(list => {
        const filteredTodos = list.filter(todo => todo.completed === false);

        setTodos(filteredTodos);
      });
    } else {
      fetchData().then(list => {
        const filteredTodos = list.filter(todo => todo.completed === true);

        setTodos(filteredTodos);
      });
    }
  }, [selectedItem]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                queryInput={query}
                handleSelects={handleSelects}
                onChangeInput={onChangeInput}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={visibleTodos}
                  hasClicked={hasClicked}
                  setHasClicked={setHasClicked}
                  setUser={setUser}
                  setChoosedItem={setChoosedItem}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {hasClicked && (
        <TodoModal
          user={user}
          choosedItem={choosedItem}
          setHasClicked={setHasClicked}
        />
      )}
    </>
  );
};
