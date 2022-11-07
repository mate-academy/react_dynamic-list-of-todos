/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodosStatus } from './types/TodosStatus';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filteredSelect, setFilteredSelect] = useState<TodosStatus>(TodosStatus.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setVisibleTodos(todosFromServer);
        setDataIsLoaded(true);
      } catch (error) {
        throw new Error();
      }
    };

    loadTodos();
  }, []);

  const filteredTodos = visibleTodos.filter(todo => {
    switch (filteredSelect) {
      case TodosStatus.Active:
        return !todo.completed;
      case TodosStatus.Completed:
        return todo.completed;
      case TodosStatus.All:
      default:
        return todo;
    }
  });

  const searchedTodos = filteredTodos.filter(todo => {
    const titleToLowerCase = todo.title.toLowerCase();
    const queryToLowerCase = query.toLowerCase();

    return titleToLowerCase.includes(queryToLowerCase);
  });

  const selectTodo = (todoId: number) => {
    return visibleTodos.find(todo => todo.id === todoId) || null;
  };

  const setFilterStatus = (status:TodosStatus) => {
    setFilteredSelect(status);
  };

  const setQueryValue = (value:string) => {
    setQuery(value);
  };

  const setSelectedTodoId = (id: number) => {
    setSelectedTodo(id);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilteredSelect={setFilterStatus}
                query={query}
                setQuery={setQueryValue}
              />
            </div>

            <div className="block">
              {!dataIsLoaded && <Loader />}

              {visibleTodos.length > 0 && (
                <TodoList
                  searchedTodos={searchedTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo !== 0 && (
        <TodoModal
          todo={selectTodo(selectedTodo)}
          selectedTodo={setSelectedTodoId}
        />
      )}
    </>
  );
};
