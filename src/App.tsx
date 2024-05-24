import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

type FilterProps = {
  query: string;
  status: TodoStatus;
};

const filterTodos = (todos: Todo[], { query, status }: FilterProps) => {
  let filteredTodos = todos;

  if (query.trim()) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  if (status !== TodoStatus.all) {
    filteredTodos = filteredTodos.filter(todo =>
      status === TodoStatus.completed ? todo.completed : !todo.completed,
    );
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(TodoStatus.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        return (
          <p style={{ color: 'red' }}>Something went wrong, try again later</p>
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = filterTodos(todos, { query, status });

  const handleSelectedTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleCanceledSelected = () => {
    setSelectedTodo(null);
  };

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
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={handleSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onCanceledSelected={handleCanceledSelected}
        />
      )}
    </>
  );
};
