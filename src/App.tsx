/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import { getTodos, getUser } from './api';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

type Status = 'all' | 'active' | 'completed';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    if (selectedTodo?.id === todo.id) {
      setSelectedTodo(null);
      setSelectedUser(null);

      return;
    }

    setSelectedTodo(todo);
    setSelectedUser(null);
    setIsLoadingUser(true);

    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => setIsLoadingUser(false));
  };

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

      const matchesStatus =
        status === 'all'
          ? true
          : status === 'active'
            ? !todo.completed
            : todo.completed;

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, status]);

  return (
    <div className="App">
      <h1 className="title">Dynamic list of TODOs</h1>

      <TodoFilter
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={value => setStatus(value as Status)}
        onClearQuery={() => setQuery('')}
      />

      {isLoadingTodos ? (
        <Loader />
      ) : (
        <TodoList
          todos={visibleTodos}
          selectedTodoId={selectedTodo?.id ?? null}
          onSelectTodo={handleSelectTodo}
        />
      )}

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoadingUser={isLoadingUser}
          onClose={() => {
            setSelectedTodo(null);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};
