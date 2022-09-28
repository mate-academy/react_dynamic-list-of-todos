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
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todoList);
  const [onLoader, setOnLoader] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(response => {
      setTodoList(response);
      setVisibleTodos(response);
    }).then(() => setOnLoader(false));
  }, []);

  const filterTodos = (sortBy: string, input: string) => {
    setVisibleTodos(
      todoList.filter(todo => {
        switch (sortBy) {
          case 'completed':
            return todo.completed;
          case 'active':
            return !todo.completed;
          default:
            return true;
        }
      }).filter(todo => todo.title.toLowerCase().includes(input.toLowerCase())),
    );
  };

  const selectTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filteredTodos={filterTodos} />
            </div>

            <div className="block">
              {!onLoader
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={selectTodo}
                    selectedTodo={selectedTodo}
                  />
                )
                : (<Loader />)}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectTodo={selectTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
