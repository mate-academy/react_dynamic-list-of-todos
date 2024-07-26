import React, { useEffect, useState, useCallback, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodoList)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodoList = useMemo(() => {
    let filteredTodos = todoList;

    if (status === Status.Active) {
      filteredTodos = todoList.filter(todo => !todo.completed);
    } else if (status === Status.Completed) {
      filteredTodos = todoList.filter(todo => todo.completed);
    }

    if (searchText) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    return filteredTodos;
  }, [status, searchText, todoList]);

  const handleFilterChange = useCallback(
    (newStatus: Status, newText: string) => {
      setStatus(newStatus);
      setSearchText(newText);
    },
    [],
  );

  const toggleModal = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                searchText={searchText}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todoList={filteredTodoList}
                  onEyeClick={toggleModal}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeModal={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
