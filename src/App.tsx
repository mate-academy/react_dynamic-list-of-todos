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
  const [visibleTodos, setTodos] = useState<Todo[]>([]);
  const [searchedTodo, setSearchedTodos] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoCategory, setTodoCategory] = useState('All');
  const [todoId, setTodoId] = useState(0);
  const [userId, setUserId] = useState(1);
  const [todoStatus, setTodoStatus] = useState(false);

  // eslint-disable-next-line no-console
  useEffect(() => {
    getTodos().then(todos => setTodos(todos));
  }, []);

  const resetUser = () => {
    setSelectedTodo(null);
    setTodoId(0);
  };

  const handleSearch = (search: string) => {
    setSearchedTodos(search);
  };

  const handleFilter = (category: string) => {
    setTodoCategory(category);
  };

  const handleTodoStatus = (status: boolean) => {
    setTodoStatus(status);
  };

  const filterTodos = (search: string, category: string) => {
    let categoryStatus: boolean | null = null;

    switch (category) {
      case 'active':
        categoryStatus = false;
        break;
      case 'completed':
        categoryStatus = true;
        break;
      default:
        categoryStatus = null;
    }

    return visibleTodos.filter(todo => {
      const formattedTitle = todo.title.toLowerCase();
      const formattedSearch = search.toLowerCase();

      if (categoryStatus !== null) {
        return formattedTitle.includes(formattedSearch)
          && todo.completed === categoryStatus;
      }

      return formattedTitle.includes(formattedSearch);
    });
  };

  const filteredTodos = filterTodos(searchedTodo, todoCategory);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={todoCategory}
                onFilter={handleFilter}
                search={searchedTodo}
                searchTodo={handleSearch}
              />
            </div>

            <div className="block">
              {visibleTodos.length > 0 || <Loader />}
              <TodoList
                selectedTodoId={todoId}
                selectTodoId={(id: number) => setTodoId(id)}
                selectUserId={(id: number) => setUserId((id))}
                todos={filteredTodos}
                setStatus={(status: boolean) => handleTodoStatus(status)}
                selectTodo={(todo: Todo) => setSelectedTodo(todo)}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodoId={todoId}
          status={todoStatus}
          onReset={resetUser}
          userId={userId}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
