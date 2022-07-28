import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [todoId, setTodoId] = useState(0);
  const [userId, setUserId] = useState<number>(0);
  const [query, setQuery] = useState('');

  const selectedTodo = todos
    .find(todo => todo.id === todoId);

  useEffect(() => {
    getTodos()
      .then(tds => {
        setTodos(tds);
      });
  }, []);

  const visibleMovies = (visibleTodos: Todo[], filt: string) => {
    let preparedTodos;

    switch (filt) {
      case 'all':
        preparedTodos = visibleTodos;
        break;

      case 'active':
        preparedTodos = visibleTodos
          .filter(todo => todo.completed === false);
        break;

      case 'completed':
        preparedTodos = visibleTodos
          .filter(todo => todo.completed === true);
        break;

      default:
        break;
    }

    return preparedTodos?.filter(todo => todo.title.includes(query));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleMovies(todos, filter)}
                    selectedTodoId={todoId}
                    selectTodo={(selectedTodoId: number) => {
                      setTodoId(selectedTodoId);
                    }}
                    setUserId={setUserId}
                  />
                ) : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && userId && (
        <TodoModal
          selectedTodo={selectedTodo}
          userId={userId}
          setUserId={setUserId}
          selectTodo={(selectedTodoId: number) => {
            setTodoId(selectedTodoId);
          }}
        />
      )}

    </>
  );
};
