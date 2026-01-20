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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [select, setSelect] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  const handleSelect = async (todo: Todo) => {
    setSelectedTodo(todo);
    setIsUserLoading(true);

    const userFromServer = await getUser(todo.userId);

    setUser(userFromServer);

    setIsUserLoading(false);
  };

  const todoWithSelection = todos.map(todo => ({
    ...todo,
    isSelected: selectedTodo?.id === todo.id,
  }));

  const filteredTodos = todoWithSelection
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      if (select === 'all') {
        return true;
      }

      if (select === 'active') {
        return !todo.completed;
      }

      if (select === 'completed') {
        return todo.completed;
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
                query={query}
                onQueryChange={setQuery}
                onQueryClear={() => setQuery('')}
                select={select}
                onSelectChange={setSelect}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={filteredTodos} onSelect={handleSelect} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoading={isUserLoading}
          onClose={() => {
            setSelectedTodo(null);
            setUser(null);
          }}
        />
      )}
    </>
  );
};
