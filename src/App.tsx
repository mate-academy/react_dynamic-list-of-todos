/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((response) => setTodos(response))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedTodos: Todo[] = useMemo(() => {
    let filteredList: Todo[] = todos;

    if (query.length) {
      filteredList = filteredList.filter((todo) => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    switch (filterBy) {
      case 'active':
        return filteredList.filter(item => !item.completed);

      case 'completed':
        return filteredList.filter(item => item.completed);

      default:
        return filteredList;
    }
  }, [query, filterBy, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterBy={filterBy}
                setQuery={setQuery}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={preparedTodos}
                setSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          clearSelectedTodo={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
