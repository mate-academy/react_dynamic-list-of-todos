/* eslint-disable max-len */
import { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    getTodos().then((receivedTodos) => {
      if (receivedTodos.length > 0) {
        setIsLoading(false);
        setTodos(receivedTodos);
      }
    });
  }, []);

  const showTodoDetails = (todoId: number) => () => {
    setSelectedTodoId(todoId);
  };

  const hideTodoDetails = () => {
    setSelectedTodoId(0);
  };

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
              {isLoading && <Loader />}
              <TodoList
                todos={todos}
                selectedTodoId={selectedTodoId}
                onShowTodo={showTodoDetails}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal
          todos={todos}
          selectedTodoId={selectedTodoId}
          onHideTodo={hideTodoDetails}
        />
      )}
    </>
  );
};
