import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todosFromApi, setTodosFromApi] = useState<Todo[]>([]);
  const [isLoadingInList, setIsLoadingInList] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');

  const handleShowTodoModal = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    setIsLoadingInList(true);
    getTodos()
      .then(todos => setTodosFromApi(todos))
      .finally(() => setIsLoadingInList(false));
  }, []);

  const filteredTodos = todosFromApi.filter(todo => {
    if (status === 'completed' && !todo.completed) {
      return false;
    }

    if (status === 'active' && todo.completed) {
      return false;
    }

    if (query && !todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
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
                status={status}
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoadingInList ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  showTodoModal={handleShowTodoModal}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <TodoModal
        selectedTodo={selectedTodo}
        onClose={() => setSelectedTodo(null)}
      />
    </>
  );
};
