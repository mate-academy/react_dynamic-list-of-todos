/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

enum Selected {
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  const queryInLowerCase = query.toLowerCase();

  const filteredTodos = () => {
    const selectedTodos = todos.filter(todo => {
      switch (selected) {
        case Selected.Active:
          return !todo.completed;

        case Selected.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });

    return selectedTodos.filter(todo => todo.title.toLowerCase().match(queryInLowerCase));
  };

  useEffect(() => {
    (async () => {
      const todosFromAPI = await getTodos();

      setTodos(todosFromAPI);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selected={selected}
                setSelected={setSelected}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={filteredTodos()}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo.userId !== 0 && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
