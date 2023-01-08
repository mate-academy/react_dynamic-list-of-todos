/* eslint-disable max-len */
import { useState, useEffect } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  async function getTodosFromServer() {
    setIsLoading(true);
    const allTodos = await getTodos();

    setTodosFromServer(allTodos);
    setTodos(allTodos);
    setIsLoading(false);
  }

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const getFilteredTodos = () => {
    return todos.filter(todo => {
      const filterByQuery = todo.title.toLowerCase()
        .includes(query.toLowerCase());

      switch (filter) {
        case 'active':
          return !todo.completed && filterByQuery;
        case 'completed':
          return todo.completed && filterByQuery;
        default:
          return filterByQuery;
      }
    });
  };

  const resetHandler = () => {
    setQuery('');
    setTodos(todosFromServer);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setQueryHandler={setQuery}
                query={query}
                resetHandler={resetHandler}
                filterHandler={setFilter}

              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={getFilteredTodos()}
                    selectedTodo={todoId}
                    setSelectedTodo={setSelectedTodo}
                    setTodoId={(todosId) => {
                      setTodoId(todosId);
                    }}
                  />
                )}
            </div>

            {todoId !== 0 && selectedTodo && (
              <TodoModal
                selectedTodo={selectedTodo}
                setTodoId={(todosId) => {
                  setTodoId(todosId);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
