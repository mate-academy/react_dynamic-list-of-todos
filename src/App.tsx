/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todosList, setTodosList] = React.useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = React.useState<number>(0);
  const [selectFilter, setSelectFilter] = React.useState<boolean | null>(null);

  const [query, setQuery] = React.useState<string>('');

  const handleSelectTodo = (id: number) => {
    setSelectedTodo(id);
  };

  let filteredTodoList = todosList.filter((todo) => (selectFilter === null ? todo : todo.completed === selectFilter));

  filteredTodoList = filteredTodoList.filter((todo) => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  React.useEffect(() => {
    getTodos().then((todos) => setTodosList(todos));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSelectChange={setSelectFilter}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {todosList.length > 0 ? (
                <TodoList
                  todos={filteredTodoList}
                  selectedTodo={selectedTodo}
                  setTodo={handleSelectTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== 0 && (
        <TodoModal
          selectedTodo={selectedTodo}
          todosList={filteredTodoList}
          setTodo={handleSelectTodo}
        />
      )}
    </>
  );
};
