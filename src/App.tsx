import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoStatus } from './types/TodoStatus';

const filterTodos = (
  todoStatus: string, queryToFilter: string, todos: Todo[],
) => {
  const filteredByStatus = todos.filter(todo => {
    switch (todoStatus) {
      case TodoStatus.ACTIVE:
        return !todo.completed;

      case TodoStatus.COMPLETED:
        return todo.completed;

      default:
        return todo;
    }
  });

  return filteredByStatus.filter(
    todo => todo.title.toLowerCase().includes(queryToFilter.toLowerCase()),
  );
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState<TodoStatus>(TodoStatus.ALL);

  const loadTodos = async () => {
    setIsTodosLoading(true);

    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch (error) {
      throw new Error(`something went wrong ${error}`);
    } finally {
      setIsTodosLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleTodoId = (id: number) => {
    setTodoId(id);
  };

  const currentTodo = todos.find(todo => todo.id === todoId) || null;

  const closeModal = () => setTodoId(0);

  const visibleTodos = filterTodos(selectValue, query, todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setSelectValue={setSelectValue}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={todoId}
                  selectTodo={handleTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} closeModal={closeModal} />}
    </>
  );
};
