import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const isModalShouldBeShowed = selectedTodo && selectedUserId;

  const chooseUser = useCallback((todo: Todo | null) => {
    if (todo) {
      setSelectedUserId(todo.id !== selectedUserId ? todo.id : 0);
      setSelectedTodo(todo);
    } else {
      setSelectedUserId(0);
    }
  }, []);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
      setIsTodosLoaded(true);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isTodosLoaded
                ? (
                  <TodoList
                    todos={todos}
                    selectedId={selectedUserId}
                    onSelect={chooseUser}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {isModalShouldBeShowed && (
        <TodoModal
          todo={selectedTodo}
          userId={selectedUserId}
          onClose={() => chooseUser(null)}
        />
      )}
    </>
  );
};
