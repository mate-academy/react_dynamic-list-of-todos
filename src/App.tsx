import React, { useEffect, useState } from 'react';
import { TodoModal } from './components/TodoModal';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'completed' | 'active'>('all');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all'
        ? true
        : status === 'completed'
          ? todo.completed
          : !todo.completed;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="App">
      <h1>Todo List</h1>

      <TodoFilter
        query={query}
        onQueryChange={setQuery}
        onClearQuery={() => setQuery('')}
        status={status}
        onStatusChange={setStatus}
      />

      <TodoList todos={filteredTodos} onShow={setSelectedTodo} />

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </div>
  );
};
