import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodoFilterEnum } from './enums/TodoFilterEnum';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [appFilter, setAppFilter] = useState<TodoFilterEnum>(
    TodoFilterEnum.All,
  );
  const [appQuery, setAppQuery] = useState<string>('');

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseTodo = () => {
    setSelectedTodo(null);
  };

  const handleFilterChange = (filter: TodoFilterEnum) => {
    setAppFilter(filter);
  };

  const handleSearch = (query: string) => {
    setAppQuery(query.toLowerCase());
  };

  const handleClearSearch = () => {
    setAppQuery('');
  };

  const filteredTodos = todos.filter(todo => {
    const firstCondition = todo.title
      .toLowerCase()
      .includes(appQuery.toLowerCase());

    switch (appFilter) {
      case TodoFilterEnum.All:
        return firstCondition;
      case TodoFilterEnum.Active:
        return firstCondition && !todo.completed;
      case TodoFilterEnum.Completed:
        return firstCondition && todo.completed;
      default:
        return true;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseTodo} />
      )}
    </>
  );
};
