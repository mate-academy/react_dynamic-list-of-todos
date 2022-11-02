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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isTodoSelected, setIsTodoSelected] = useState(false);

  const getTodosFromServer = async () => {
    let allTodos = await getTodos();

    switch (selectedOption) {
      case 'all':
        break;

      case 'active':
        allTodos = allTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        allTodos = allTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    allTodos = allTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

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
