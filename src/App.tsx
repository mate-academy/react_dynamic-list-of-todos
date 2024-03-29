/* eslint-disable max-len */
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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [querry, setQuerry] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let visibleTodos: Todo[] = [...todos];

  (function prepareVisibleTodos() {
    if (querry !== '') {
      visibleTodos = visibleTodos.filter(item =>
        item.title.toLowerCase().includes(querry.toLowerCase()),
      );
    }

    if (filterBy !== 'all') {
      visibleTodos = visibleTodos.filter(item => {
        switch (filterBy) {
          case 'active':
            return !item.completed;
          case 'completed':
            return item.completed;
          default:
            return item;
        }
      });
    }
  })();

  const onSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                querry={querry}
                setQuerry={setQuerry}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoaded === false && <Loader />}
              <TodoList
                todos={visibleTodos}
                onSelect={onSelect}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
