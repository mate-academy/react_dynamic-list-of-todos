/* eslint-disable */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  name: string;
  email: string;
}

const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
const fetchTodos = (): Promise<Todo[]> =>
  fetch('https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json')
    .then(res => res.json());
const fetchUser = async (userId: number): Promise<User> => {
  await wait(1000);
  return fetch(`https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${userId}.json`)
    .then(res => res.json());
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setIsLoadingTodos(true);
    fetchTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
      })
      .finally(() => setIsLoadingTodos(false));
  }, []);

  useEffect(() => {
    let result: Todo[] = todos;

    if (filter === 'completed') {
      result = todos.filter(todo => todo.completed);
    } else if (filter === 'active') {
      result = todos.filter(todo => !todo.completed);
    }

    if (query) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredTodos(result);
  }, [todos, filter, query]);

  const handleShowTodo = (todo: Todo): void => {
    setSelectedTodo(todo);
    setIsLoadingUser(true);
    fetchUser(todo.userId)
      .then(userData => setUser(userData))
      .finally(() => setIsLoadingUser(false));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>
            <div className="block">
              {isLoadingTodos && <Loader />}
              <TodoList
                todos={filteredTodos}
                onShowTodo={handleShowTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoading={isLoadingUser}
          onClose={() => {
            setSelectedTodo(null);
            setUser(null);
            setIsLoadingUser(false);
          }}
        />
      )}
    </>
  );
};
