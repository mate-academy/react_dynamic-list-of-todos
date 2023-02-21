/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
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
    getTodos().then((data) => {
      setTodos(data);
      setIsLoading(false);
    });
  }, []);

  const getVisibleTodos = () => {
    return todos.filter((todo) => {
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
  };

  const visibleTodos = useMemo(getVisibleTodos, [
    todos,
    todoSelector,
    todoFilter,
  ]);

  const showTodoDetails = (todo: Todo | null) => () => {
    setSelectedTodo(todo);
  };

  const hideTodoDetails = () => {
    setSelectedTodo(null);
  };

  const handleTodoSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoSelector(event.target.value);
  };

  const handleTodoFiltering = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoFilter(event.currentTarget.value);
  };

  const handleClearFilter = () => {
    setTodoFilter('');
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
                onClearTodoFilter={handleClearFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
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
