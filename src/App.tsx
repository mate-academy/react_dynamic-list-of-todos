import { useEffect, useState } from 'react';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: React.FC = () => {
  const [loadedTodos, setLoadedTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const select = (value: number) => setSelectedTodoId(value);

  useEffect(() => {
    const loader = async () => {
      await getTodos().then(todos => {
        setLoadedTodos(todos);
        setVisibleTodos(todos);
      });

      setIsLoaded(true);
    };

    loader();
  }, []);

  const filteredTodos = (value: string, filteredBy: string) => {
    const todos = loadedTodos.filter(todo => {
      switch (filteredBy) {
        case 'active':
          return !todo.completed && todo.title.includes(value);
        case 'completed':
          return todo.completed && todo.title.includes(value);
        default:
          return todo.title.includes(value);
      }
    });

    setVisibleTodos(todos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilteredTodos={filteredTodos} />
            </div>

            <div className="block">
              {!isLoaded
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodoId}
                    select={select}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {!!selectedTodoId && (
        <TodoModal
          currentTodo={visibleTodos.find(todo => todo.id === selectedTodoId)}
          select={select}
        />
      )}
    </>
  );
};
