import { useEffect, useMemo, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { getVisibleTodos } from './VisibleTodos';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FilterOptions } from './types/FilterOptions';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredOption, setFilteredOption] = useState<FilterOptions>('all');
  const [typedTitle, setTypedTitle] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Eroor while fetching todos:', error);
      });
  }, []);

  const handleFilterChange = (selected: FilterOptions) => {
    setFilteredOption(selected);
  };

  const visibleTodosResult = useMemo(() => getVisibleTodos(todos,
    filteredOption, typedTitle),
  [todos, filteredOption, typedTitle]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                typedTitle={typedTitle}
                setTypedTitle={setTypedTitle}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodosResult}
                    setSelectedTodoId={setSelectedTodoId}
                    selectedTodoId={selectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          setSelectedTodoId={setSelectedTodoId}
          todos={visibleTodosResult}
          selectedTodoId={selectedTodoId}
        />
      )}
    </>
  );
};
