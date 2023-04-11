/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { User } from './types/User';

export const App: React.FC = React.memo(() => {
  const [originalTodos, setOriginalTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [searchQueryTodo, setSearchQueryTodo] = useState<Todo[]>([]);
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getTodos().then(result => {
      setOriginalTodos(result);
      setFilteredTodos(result);
      setLoaded(true);
    });
  }, []);

  const handleFilterTodos = (filterType: string) => {
    switch (filterType) {
      case 'active':
        setFilteredTodos(originalTodos.filter(todo => !todo.completed));
        setSearchQueryTodo(originalTodos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setFilteredTodos(originalTodos.filter(todo => todo.completed));
        setSearchQueryTodo(originalTodos.filter(todo => todo.completed));
        break;
      default:
        setFilteredTodos(originalTodos);
        setSearchQueryTodo(originalTodos);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter searchQueryTodo={searchQueryTodo} handleFilterTodos={handleFilterTodos} setFilteredTodos={setFilteredTodos} />
            </div>

            <div className="block">
              {!loaded && <Loader />}
              <TodoList todos={filteredTodos} setUser={setUser} setSelectedTodoId={setSelectedTodoId} />
            </div>
          </div>
        </div>
      </div>

      {user.id !== 0
        ? <TodoModal user={user} todos={filteredTodos} setUser={setUser} selectedTodoId={selectedTodoId} /> : ''}
    </>
  );
});
