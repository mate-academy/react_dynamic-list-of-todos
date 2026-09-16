/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SelectValue } from './types/SelectValue';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [todoInfo, setTodoInfo] = useState<Todo | null>(null);
  const [selectedValue, setSelectedValue] = useState<SelectValue>(
    SelectValue.All,
  );
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(data => {
      setIsDataLoaded(true);

      if (selectedValue === SelectValue.All) {
        setTodos(data);
      } else if (selectedValue === SelectValue.Active) {
        setTodos(data.filter(item => item.completed === false));
      } else {
        setTodos(data.filter(item => item.completed === true));
      }
    });
  }, [selectedValue]);

  const handleTodoViewClick = (selectedTodo: Todo) => {
    setTodoInfo(selectedTodo);
  };

  const handleTodoModalClose = () => {
    setTodoInfo(null);
  };

  const handleSelectChange = (selectedNewValue: SelectValue) => {
    if (selectedNewValue === selectedValue) {
      return;
    }

    setSelectedValue(selectedNewValue);
  };

  const handleQueryChange = (value: string) => {
    if (query.toLowerCase() === value.toLowerCase()) {
      return;
    }

    setQuery(value);
  };

  const filteredTodos = todos.filter(({ title }) =>
    title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={handleSelectChange}
                onQueryChange={handleQueryChange}
                query={query}
              />
            </div>

            <div className="block">
              {isDataLoaded ? (
                <TodoList
                  todos={filteredTodos}
                  onClick={handleTodoViewClick}
                  selectedTodo={todoInfo?.id || null}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {todoInfo && <TodoModal todo={todoInfo} onClick={handleTodoModalClose} />}
    </>
  );
};
