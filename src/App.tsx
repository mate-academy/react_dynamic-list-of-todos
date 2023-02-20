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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then((receivedTodos) => {
      if (receivedTodos.length > 0) {
        setIsLoading(false);
        setTodos(receivedTodos);
      }
    });
  }, []);

  const showTodoDetails = (todo: Todo | null) => () => {
    setSelectedTodo(todo);
  };

  const hideTodoDetails = () => {
    setSelectedTodo(null);
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
                selectedTodo={selectedTodo}
                onShowTodo={showTodoDetails}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal selectedTodo={selectedTodo} onHideTodo={hideTodoDetails} />
      )}
    </>
  );
};
