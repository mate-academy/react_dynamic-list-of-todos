/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types.ts';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);

  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState('all');

  React.useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleTodoClick = (todo: Todo) => {
    if (selectedTodo?.id === todo.id) {
      setSelectedTodo(null);

      return;
    }

    setSelectedTodo(todo);
  };

  const visibleTodos = todos
    .filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              query={query}
              onQueryChange={setQuery}
              status={status}
              onStatusChange={setStatus}
            />
          </div>

          <div className="block">
            {loading ? (
              <Loader />
            ) : (
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                onTodoClick={handleTodoClick}
              />
            )}
          </div>

          {selectedTodo && (
            <TodoModal
              todo={selectedTodo}
              onClose={() => setSelectedTodo(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
