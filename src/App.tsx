/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { SelectBy } from './Enums/SelectBy';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [completedFilter, setCompletedFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const foundTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [todos, selectedTodoId]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const selectedTodos = useCallback(() => {
    switch (completedFilter) {
      case SelectBy.All:
        return todos;
      case SelectBy.Active:
        return todos.filter(todo => !todo.completed);
      case SelectBy.Completed:
      default:
        return todos.filter(todo => todo.completed);
    }
  }, [completedFilter, todos]);

  const filteredTodos = useMemo(() => {
    return selectedTodos()
      .filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, todos, selectedTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectBy={completedFilter}
                setSelectBy={setCompletedFilter}
                inputSearch={searchQuery}
                setInputSearch={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={selectedTodoId}
                    setSelectedTodoId={setSelectedTodoId}
                    isLoading={isLoading}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && foundTodo && (
        <TodoModal
          selectedTodo={foundTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};
