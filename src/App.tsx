import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoStatus, setSelectedTodoStatus] = useState<TodoStatus>(
    TodoStatus.All,
  );
  const [isTodoLoaded, setIsTodoLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        setIsTodoLoaded(true);
      });
  }, []);

  const chooseUser = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  const filterTodos = () => {
    const todosMatchQuery = todos.filter(({ title }) => (
      title.toLowerCase().includes(query.toLowerCase())
    ));

    return todosMatchQuery.filter(todo => {
      switch (selectedTodoStatus) {
        case TodoStatus.Active:
          return !todo.completed;

        case TodoStatus.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                selectedTodoStatus={selectedTodoStatus}
                setSelectedTodoStatus={setSelectedTodoStatus}
              />
            </div>

            <div className="block">
              {isTodoLoaded
                ? (
                  <TodoList
                    todos={filterTodos()}
                    selectedTodo={selectedTodo}
                    onSelect={chooseUser}
                  />
                )
                : (<Loader />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => chooseUser(null)}
        />
      )}
    </>
  );
};
