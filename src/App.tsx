import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [fisterStatus, setFisterStatus] = useState('');

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setLoading(false);
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getPreparedTodos = useMemo(() => {
    let preparedTodos = [...todos];

    if (fisterStatus) {
      preparedTodos = preparedTodos.filter(todo1 => {
        switch (fisterStatus) {
          case 'active':
            return !todo1.completed;
          case 'completed':
            return todo1.completed;
          default:
            return true;
        }
      });
    }

    return preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, fisterStatus, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                fisterStatus={fisterStatus}
                onChangeFisterStatus={setFisterStatus}
                onChangeQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={getPreparedTodos}
                  onSelect={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onSelect={setSelectedTodo} />
      )}
    </>
  );
};
