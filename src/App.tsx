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
import { Category } from './types/enums/Category';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>(Category.All);
  // eslint-disable-next-line prettier/prettier
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const getTodoList = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
        setIsLoading(false);
      } catch (err) {
        setError('GET getTodoList() ERROR');
        setIsLoading(true);
      }
    };

    getTodoList();
  }, []);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  const filteredTodos = todos
    .filter(todo => {
      if (category === Category.Completed) {
        return todo.completed;
      }

      if (category === Category.Active) {
        return !todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

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
                category={category}
                setCategory={setCategory}
              />
            </div>
            {error && (
              <div className="message is-danger is-flex is-justify-content-center">
                {error}
              </div>
            )}
            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
