/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './utils/todo';
import { getUsers } from './utils/user';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { User } from './types/User';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function showedTodos(todos: Todo[], status: string, query: string): Todo[] {
    let result = todos;

    if (status === 'active') {
      result = result.filter(todo => !todo.completed);
    }

    if (status === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    if (query.trim()) {
      const normalizedQuery = query.toLowerCase();

      result = result.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return result;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const visibleTodos = showedTodos(todos, status, query);
  const selectedUser = selectedTodo
    ? users.find(user => user.id === selectedTodo.userId)
    : null;

  useEffect(() => {
    getTodos().then(setTodos);
    getUsers().then(setUsers);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onQueryChange={setQuery} onStatusChange={setStatus} />
            </div>

            <div className="block">
              <TodoList todos={visibleTodos} onTodoSelect={setSelectedTodo} />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && selectedUser && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
