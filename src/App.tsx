/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TypeOfTodos } from './types/TypeOfTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [typeOfTodos, setTypeOfTodos] = useState<TypeOfTodos>(TypeOfTodos.ALL);

  useEffect(() => {
    try {
      getTodos()
        .then(todosFromServer => {
          setTodos(todosFromServer);
          setIsLoaded(true);
        });
    } catch {
      throw new Error('There are not todos');
    }
  }, []);

  const handleValue = (value: string) => (
    value.toLowerCase().includes(query.toLowerCase())
  );

  const visibleTodos = () => {
    const filteredTodos = todos.filter(todo => {
      handleValue(todo.title);

      switch (typeOfTodos) {
        case TypeOfTodos.ACTIVE:
          return !todo.completed && handleValue(todo.title);

        case TypeOfTodos.COMPLETED:
          return todo.completed && handleValue(todo.title);

        default:
          return handleValue(todo.title);
      }
    });

    return filteredTodos;
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
                filterType={typeOfTodos}
                setFilterType={setTypeOfTodos}
              />
            </div>

            <div className="block">
              {isLoaded ? (
                <TodoList
                  todos={visibleTodos()}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
