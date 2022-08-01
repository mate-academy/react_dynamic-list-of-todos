import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTotos] = useState<Todo[]>([]);
  const [isLoaded, setLoading] = useState(false);
  const [selectedTodoId, setselectedTodoId] = useState(0);

  useEffect(() => {
    const loading = async () => {
      const loadingTodo = await getTodos();

      setTodosFromServer(loadingTodo);
      setVisibleTotos(loadingTodo);
      setLoading(true);
    };

    loading();
  }, []);

  const filtredTodos = (query: string, condition: string) => {
    const todos = todosFromServer.filter(todo => {
      switch (condition) {
        case 'active':
          return !todo.completed && todo.title.includes(query);

        case 'completed':
          return todo.completed && todo.title.includes(query);

        default:
          return todo.title.includes(query);
      }
    });

    setVisibleTotos(todos);
  };

  const selectID = (query: number) => setselectedTodoId(query);

  return (
    <>
      <div className="section">

        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filteredTodos={filtredTodos} />
            </div>

            <div className="block">
              {isLoaded === false
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    onTodoSelected={selectID}
                    selectedTodoId={selectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId > 0 && (
        <TodoModal
          todo={visibleTodos.find(todo => todo.id === selectedTodoId)}
          onClose={selectID}
        />
      )}
    </>
  );
};

export default App;
