/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Statuses } from './types/Statuses';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchedQuery, setSearchedQuery] = useState('');
  const [selectedStatusOfTodo, setSelectedStatusOfTodo] = useState<Statuses>(Statuses.All);

  const fetchData = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function searchAndSort() {
    let filteredTodos: Todo[] = JSON.parse(JSON.stringify(todos));

    const isCompleted = selectedStatusOfTodo === Statuses.Completed;

    if (selectedStatusOfTodo === Statuses.Active || selectedStatusOfTodo === Statuses.Completed) {
      filteredTodos = filteredTodos
        .filter(todo => todo.completed === isCompleted);
    }

    if (searchedQuery) {
      filteredTodos = filteredTodos
        .filter(todo => {
          return todo.title.toLowerCase().includes(searchedQuery.toLowerCase());
        });
    }

    return filteredTodos;
  }

  const visibleTodos: Todo[] = searchAndSort();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchedQuery={searchedQuery}
                setSearchedQuery={setSearchedQuery}
                selectedStatusOfTodo={selectedStatusOfTodo}
                setSelectedStatusOfTodo={setSelectedStatusOfTodo}
              />
            </div>

            <div className="block">
              {
                visibleTodos.length
                  ? (
                    <TodoList
                      todos={visibleTodos}
                      setSelectedTodo={setSelectedTodo}
                      selectedTodo={selectedTodo}
                    />
                  )
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          resetSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
