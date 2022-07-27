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

  const selectedTodo = todos
    .find(todo => todo.id === todoId);

  useEffect(() => {
    getTodos()
      .then(tds => {
        setTodos(tds);
      });
  }, []);

  const visibleMovies = (visibleTodos: Todo[], filt: string) => {
    let todoArr;

    switch (filt) {
      case 'all':
        todoArr = visibleTodos;
        break;

      case 'active':
        todoArr = [...visibleTodos].filter(todo => todo.completed === false);
        break;

      case 'completed':
        todoArr = [...visibleTodos].filter(todo => todo.completed === true);
        break;

      default:
        todoArr = [...visibleTodos].filter(todo => todo.title.includes(filt));

        break;
    }

    return todoArr;
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
