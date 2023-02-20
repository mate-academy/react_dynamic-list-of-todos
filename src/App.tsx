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
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoSelector, setTodoSelector] = useState('all');

  useEffect(() => {
    getTodos().then((receivedTodos) => {
      if (receivedTodos.length > 0) {
        const selectedTodos = receivedTodos.filter((todo) => {
          switch (todoSelector) {
            case 'active':
              return !todo.completed;
            case 'completed':
              return todo.completed;
            default:
              return true;
          }
        });

        setTodos(selectedTodos);
        setIsLoading(false);
      }
    });
  }, [todoSelector]);

  const showTodoDetails = (todo: Todo | null) => () => {
    setSelectedTodo(todo);
  };

  const hideTodoDetails = () => {
    setSelectedTodo(null);
  };

  const handleTodoSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoSelector(event.target.value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todoSelector={todoSelector}
                onChangeTodoSelector={handleTodoSelection}
              />
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
