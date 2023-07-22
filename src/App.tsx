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

const preparedTodos = (
  todos: Todo[],
  query: string,
  filtredType: string,
) => {
  let todosCopy = [...todos].filter(todo => (
    todo.title.toLowerCase().trim().includes(query.toLowerCase().trim())
  ));

  if (filtredType) {
    todosCopy = todosCopy.filter(todo => {
      switch (filtredType) {
        case 'all':
          return todosCopy;

        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return null;
      }
    });
  }

  return todosCopy;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filtredType, setFiltredType] = useState<string>('all');
  const [isActive, setIsActive] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const todosList = preparedTodos(todos, query, filtredType);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    getUser(selectedTodo?.userId).then(setSelectedUser);
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filtredType={filtredType}
                setFiltredType={setFiltredType}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todosList}
                  isActive={isActive}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  setIsActive={setIsActive}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isActive && (
        <TodoModal
          isActive={isActive}
          setIsActive={setIsActive}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
    </>
  );
};
