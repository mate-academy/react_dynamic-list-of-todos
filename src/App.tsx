import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [selectedTodoId, setSelectTodoId] = useState(0);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
    });
  }, []);

  const [filteredTodoTitle, setFilteredTodoTitle] = useState('');
  const [selectVisibleTodo, setSelectVisibleTodo] = useState('all');

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const filterTitle = todo.title
        .toLowerCase()
        .includes(filteredTodoTitle.toLowerCase());

      switch (selectVisibleTodo) {
        case 'active':
          return !todo.completed && filterTitle;
        case 'completed':
          return todo.completed && filterTitle;
        default:
          return filterTitle;
      }
    });
  }, [todos, filteredTodoTitle, selectVisibleTodo]);

  if (!todos.length) {
    return <Loader />;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={filteredTodoTitle}
                setQuery={(ev) => {
                  setFilteredTodoTitle(ev.target.value);
                }}
                clearButtonFilter={(ev) => {
                  ev.preventDefault();
                  setFilteredTodoTitle('');
                }}
                option={selectVisibleTodo}
                setOption={setSelectVisibleTodo}
              />
            </div>

            <div className="block">
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodoId}
                selectTodo={(todoIDfromServer:
                React.SetStateAction<number>) => {
                  setSelectTodoId(todoIDfromServer);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId && (
        <TodoModal
          todos={todos}
          selectedTodoId={selectedTodoId}
          closeModal={() => setSelectTodoId(0)}
        />
      )}
    </>
  );
};
