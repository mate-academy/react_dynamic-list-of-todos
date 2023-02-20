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
  const [todoFilter, setTodoFilter] = useState('');

  useEffect(() => {
    getTodos().then((receivedTodos) => {
      if (receivedTodos.length > 0) {
        const selectedTodos = receivedTodos.filter((todo) => {
          const todoTitleIncludesFilter = todo.title
            .toLowerCase()
            .includes(todoFilter.toLowerCase());

          switch (todoSelector) {
            case 'active':
              return !todo.completed && todoTitleIncludesFilter;
            case 'completed':
              return todo.completed && todoTitleIncludesFilter;
            default:
              return todoTitleIncludesFilter;
          }
        });

        setTodos(selectedTodos);
        setIsLoading(false);
      }
    });
  }, [todoSelector, todoFilter]);

  const showTodoDetails = (todo: Todo | null) => () => {
    setSelectedTodo(todo);
  };

  const hideTodoDetails = () => {
    setSelectedTodo(null);
  };

  const handleTodoSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoSelector(event.target.value);
  };

  const handleTodoFiltering = (
    event:
    | React.ChangeEvent<HTMLInputElement>
    | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (event.currentTarget.className === 'input') {
      setTodoFilter(event.currentTarget.value);
    } else {
      setTodoFilter('');
    }
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
                todoFilter={todoFilter}
                onChangeTodoFilter={handleTodoFiltering}
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
