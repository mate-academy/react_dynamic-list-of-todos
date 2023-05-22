/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isTodoSelected, setIsTodoSelected] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleSelectTodo = (todoId: number) => {
    setSelectedTodoId(todoId);
    setIsTodoSelected(true);
    const foundTodo = todos.find(todo => todo.id === todoId) || null;

    setSelectedTodo(foundTodo);

    const userId = todos.find(todo => todo.id === todoId)?.userId || 0;

    getUser(userId).then(setUser);
  };

  const handleCloseModal = useCallback(() => {
    setIsTodoSelected(false);
    setSelectedTodoId(null);
    setUser(null);
    setSelectedTodo(null);
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    if (selectValue === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    } else if (selectValue === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (selectValue === 'all') {
      filteredTodos = todos;
    }

    if (query) {
      filteredTodos = filteredTodos.filter(todo => {
        const lowerQuery = query.trim().toLowerCase();

        return todo.title.toLowerCase().includes(lowerQuery);
      });
    }

    return filteredTodos;
  }, [selectValue, todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            {user?.name}
            <div className="block">
              <TodoFilter
                selectValue={selectValue}
                setSelectValue={setSelectValue}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!todos.length ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={handleSelectTodo}
                    selectedTodoId={selectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {isTodoSelected
      && (
        <TodoModal
          selectedTodo={selectedTodo}
          user={user}
          closeModal={handleCloseModal}
        />
      )}
    </>
  );
};
