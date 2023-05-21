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
    getTodos().then(ts => {
      setTodos(ts);
      setFilteredTodos([...ts]);
    });
  }, []);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const unselectTodo = () => {
    setSelectedTodo(null);
  };

  const searchForTodos = (query: string, status: Status) => {
    if (!query && status === 'all') {
      setFilteredTodos([...todos]);
    } else {
      let completed: boolean | undefined;

      if (status !== 'all') {
        completed = status === 'completed';
      }

      setFilteredTodos(todos.filter(todo => {
        const todotitleLowered = todo.title.toLowerCase();
        const queryLowered = query
          .trim()
          .toLowerCase()
          .split(' ')
          .filter(Boolean)
          .join(' ');

        if (completed !== undefined) {
          return todotitleLowered.includes(queryLowered)
            && todo.completed === completed;
        }

        return todotitleLowered.includes(queryLowered);
      }));
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
                  selectTodo={selectTodo}
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
        <TodoModal selectedTodo={selectedTodo} unselectedTodo={unselectTodo} />
      )}
    </>
  );
};
