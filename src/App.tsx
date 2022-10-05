import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterTypes } from './types/Filter';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState(FilterTypes.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const downloadData = async () => {
      const data = await getTodos()
        .then(todo => {
          setTodos(todo);
          setIsLoading(false);
        });

      return data;
    };

    downloadData();
  }, []);

  let filterTodos = todos
    .filter(todoItem => {
      switch (filterBy) {
        case FilterTypes.Active:
          return !todoItem.completed;

        case FilterTypes.Completed:
          return todoItem.completed;

        default:
          return todoItem;
      }
    });

  if (query) {
    filterTodos = filterTodos.filter(todoItem => (
      todoItem.title.toLowerCase().includes(query.toLowerCase())));
  }

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
