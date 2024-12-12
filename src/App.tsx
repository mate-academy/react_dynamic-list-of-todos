/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosToShow, setTodosToShow] = useState<Todo[]>([]);

  const [query, setQuery] = useState('');
  const [statusSelect, setStatusSelect] = useState<Status>('all');

  const [loading, setLoading] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let data = todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );

    if (statusSelect !== 'all') {
      if (statusSelect === 'active') {
        data = data.filter(todo => !todo.completed);
      } else if (statusSelect === 'completed') {
        data = data.filter(todo => todo.completed);
      }
    }

    setTodosToShow(data);
  }, [query, statusSelect, todos]);

  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusSelect(event.target.value as Status);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQueryReset = () => {
    setQuery('');
  };

  const handleSelectedTodo = (id: number) => {
    setSelectedTodo(id);
  };

  const onModalClose = () => {
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
                handleStatusSelect={handleStatusSelect}
                statusSelect={statusSelect}
                handleInputChange={handleInputChange}
                handleQueryReset={handleQueryReset}
                query={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={todosToShow}
                handleSelectedTodo={handleSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal id={selectedTodo} todos={todos} onClose={onModalClose} />
      )}
    </>
  );
};
