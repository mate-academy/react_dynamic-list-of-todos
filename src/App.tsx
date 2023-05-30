import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(downloadedTodos => {
      setTodos(downloadedTodos);
      setFilteredTodos(downloadedTodos);
    });
  }, []);

  const handleTodoSelection = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleTodoUnselection = () => {
    setSelectedTodo(null);
  };

  const searchForTodos = (query: string, status: Status) => {
    if (!query && status === 'all') {
      setFilteredTodos([...todos]);
    } else {
      switch (status) {
        case 'all':
          setFilteredTodos(todos.filter(todo => {
            const todotitleLowered = todo.title.toLowerCase();
            const queryLowered = query;

            return todotitleLowered.includes(queryLowered);
          }));
          break;

        case 'completed':
          setFilteredTodos(todos.filter(todo => {
            const todotitleLowered = todo.title.toLowerCase();
            const queryLowered = query;

            return todotitleLowered.includes(queryLowered) && todo.completed;
          }));
          break;

        case 'active':
          setFilteredTodos(todos.filter(todo => {
            const todotitleLowered = todo.title.toLowerCase();
            const queryLowered = query;

            return todotitleLowered.includes(queryLowered) && !todo.completed;
          }));
          break;

        default:
          break;
      }
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter searchForTodos={searchForTodos} />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                  todos={filteredTodos}
                  onTodoSelection={handleTodoSelection}
                  selectedTodo={selectedTodo}
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
          onTodoUnselection={handleTodoUnselection}
        />
      )}
    </>
  );
};
