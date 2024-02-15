/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [displayedTodo, setDisplayedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    getTodos().then((array: Todo[]) => {
      setTodos(array);
    });
  }, []);

  const handleDisplayedTodo = (todo: Todo): void => {
    setDisplayedTodo(todo);
  };

  const handleFilter = (status: string): Todo[] => {
    switch (status) {
      case Filter.Active:
        return todos.filter((todo) => {
          return todo.completed === false;
        });
      case Filter.Completed:
        return todos.filter((todo) => {
          return todo.completed === true;
        });
      case Filter.All:
        return todos;
      default:
        return todos;
    }
  };

  const selectededTodos = handleFilter(filter);

  const filteredTodos = () => {
    if (query) {
      return selectededTodos.filter((todo) => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    return selectededTodos;
  };

  const resultTodos = filteredTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                setFilter={setFilter}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  resultTodos={resultTodos}
                  handleShowUser={handleDisplayedTodo}
                  isLook={selectedTodoId}
                  setIsLook={setSelectedTodoId}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {displayedTodo ? (
        <TodoModal
          showUser={displayedTodo}
          setShowUser={setDisplayedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      ) : ''}
    </>
  );
};
