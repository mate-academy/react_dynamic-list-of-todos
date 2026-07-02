import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [filterTitle, setFilterTitle] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    if (selectedTodo?.id === todo.id) {
      setSelectedTodo(null);
    } else {
      setSelectedTodo(todo);
    }
  };

  const visibleTodos = todos.filter(todo => {
    const matchesTitle = todo.title
      .toLowerCase()
      .includes(filterTitle.toLowerCase().trim());

    if (filterStatus === 'active') {
      return matchesTitle && !todo.completed;
    }

    if (filterStatus === 'completed') {
      return matchesTitle && todo.completed;
    }

    return matchesTitle;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Dynamic list of todos</h1>

        <div className="box">
          <TodoFilter
            filterTitle={filterTitle}
            onFilterTitleChange={setFilterTitle}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
          />

          <div className="block">
            {isLoading ? (
              <Loader />
            ) : (
              <TodoList
                todos={visibleTodos}
                onSelectTodo={handleSelectTodo}
                selectedTodoId={selectedTodo?.id}
              />
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </div>
  );
};
