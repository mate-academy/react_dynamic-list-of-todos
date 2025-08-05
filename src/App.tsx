/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { StatusFilter } from './components/TodoFilter';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const todosQuery = useTodos();

  const filteredTodos = getFilteredTodos(todosQuery.data, { query, status });

  const handleUnSelectTodo = () => { setSelectedTodo(null);
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
              {todosQuery.loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onTodoSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onModalClose={handleUnSelectTodo}
        />
      )}
    </>
  );
};
