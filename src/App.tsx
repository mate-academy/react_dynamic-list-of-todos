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
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState<FilterBy>(FilterBy.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isTodoSelected, setIsTodoSelected] = useState(false);

  const getTodosFromServer = async () => {
    let allTodos;

    try {
      allTodos = await getTodos();
    } catch (error) {
      throw new Error('Data loading error');
    }

    switch (selectedOption) {
      case FilterBy.ALL:
        break;

      case FilterBy.ACTIVE:
        allTodos = allTodos.filter(todo => !todo.completed);
        break;

      case FilterBy.COMPLETED:
        allTodos = allTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    const lowerQuery = query.toLowerCase();

    allTodos = allTodos.filter(todo => {
      const lowerTitle = todo.title.toLowerCase();

      return lowerTitle.includes(lowerQuery);
    });

    setTodos(allTodos);
  };

  useEffect(() => {
    getTodosFromServer();
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedOption={selectedOption}
                onSelectOption={(newSelectedOption) => {
                  setSelectedOption(newSelectedOption);
                }}
                query={query}
                onInputQuery={(newQuery) => {
                  setQuery(newQuery);
                }}
              />
            </div>

            <div className="block">
              {!todos.length && !query
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={todos}
                    onSelectTodo={(newSelectedTodo) => {
                      setSelectedTodo(newSelectedTodo);
                      setIsTodoSelected(true);
                    }}
                    isTodoSelected={isTodoSelected}
                    selectedTodoId={selectedTodo?.id}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isTodoSelected && (
        <TodoModal
          selectedTodo={selectedTodo}
          isTodoSelected={isTodoSelected}
          setIsTodoSelected={setIsTodoSelected}
        />
      )}
    </>
  );
};
