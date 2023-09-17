/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoStatus } from './utils/FilterParams';
import { filterTodos } from './utils/FilterTodos';
import { search } from './utils/Input';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(TodoStatus.All);
  const [inputValue, setInputValue] = useState('');
  const [isOpedModal, setIsOpedModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  // const [loader, setLoader] = useState(false);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as TodoStatus);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const clearInput = () => {
    setInputValue('');
  };

  const visibleTodos = useMemo(() => filterTodos(filter, todos), [filter, todos]);

  const seachTodo = search(inputValue, visibleTodos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                filter={filter}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                clearInput={clearInput}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={seachTodo}
                    setIsOpedModal={setIsOpedModal}
                    isOpedModal={isOpedModal}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {isOpedModal && (
        <TodoModal
          setIsOpedModal={setIsOpedModal}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
