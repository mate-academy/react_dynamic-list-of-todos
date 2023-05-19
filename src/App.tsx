/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Option } from './types/Option';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [option, setOption] = useState(Option.All);

  const handleModalClose = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const input = todo.title.toLowerCase().includes(inputValue.toLowerCase().trim());

      switch (option) {
        case Option.Active:
          return input && !todo.completed;
        case Option.Complited:
          return input && todo.completed;
        default:
          return input;
      }
    });
  }, [todos, option, inputValue]);

  const handleOption = useCallback((selectedFilter: Option) => {
    setOption(selectedFilter);
  }, []);

  const handleInputChange = useCallback((query: string) => {
    setInputValue(query);
  }, []);

  const handleTodoSelect = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => `${error} error in TODO's data`)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onInputChange={handleInputChange}
                inputValue={inputValue}
                option={option}
                onFilterChange={handleOption}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                onTodoSelect={handleTodoSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleModalClose} />
      )}
    </>
  );
};
