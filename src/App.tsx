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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('all');
  const [query, setQuery] = useState('');
  const [todoId, setTodoId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const filteredTodos = () => {
    const selectedTodos = todos.filter(todo => {
      switch (selected) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    });

    return selectedTodos.filter(todo => todo.title.toLowerCase().match(query.toLowerCase()));
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
                    setTodoId={setTodoId}
                    selectedTodo={todoId}
                    setTodoTitle={setTodoTitle}
                    setCompleted={setCompleted}
                    setUserId={setUserId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {userId !== 0 && (
        <TodoModal
          userId={userId}
          todoId={todoId}
          todoTitle={todoTitle}
          completed={completed}
          setUserId={setUserId}
          setTodoId={setTodoId}
        />
      )}
    </>
  );
};
