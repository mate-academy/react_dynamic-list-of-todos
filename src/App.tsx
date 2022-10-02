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

function loadTodos(
  setIsLoading: (isLoading: boolean) => void,
): Promise<Todo[]> {
  setIsLoading(true);

  return getTodos()
    .finally(() => {
      setIsLoading(false);
    });
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    loadTodos(setIsLoading)
      .then((todosFromServer) => {
        setTodos(todosFromServer);
      });
  }, []);

  const filterTodos = todos
    .filter(todoItem => {
      switch (filterBy) {
        case 'active':
          return !todoItem.completed;

        case 'completed':
          return todoItem.completed;

        default:
          return todoItem;
      }
    })
    .filter(todoItem => (
      todoItem.title.toLowerCase().includes(query.toLowerCase())
    ));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {
                isLoading
                  ? <Loader />
                  : (
                    <TodoList
                      todos={filterTodos}
                      selectedTodo={selectedTodo}
                      setSelectedTodo={setSelectedTodo}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>
      {selectedTodo?.userId && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
