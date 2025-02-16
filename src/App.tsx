import React, { useEffect, useState } from 'react';
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [loader, setLoader] = useState(true);

  const [selectedOption, setSelectedOption] = useState('all');
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    getTodos().then(fetchedTodos => {
      setTodos(fetchedTodos);
      setLoader(false);
    });
  }, []);

  const filteredTodos = todos.filter(todo => {
    const titleOfMatches = todo.title.toLowerCase().includes(searchInputValue.toLowerCase());
    const statusOfMatches = (() => {
      switch (selectedOption) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    })();
    return titleOfMatches && statusOfMatches;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInputValue={searchInputValue}
                setSearchInputValue={setSearchInputValue}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              {
                !loader && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
                )
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
