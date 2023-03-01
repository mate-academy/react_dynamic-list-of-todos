/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodosType } from './types/TodosType';

export const App: React.FC = () => {
  const [typeOfTodos, setTypeOfTodos] = useState<string>('all');
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todoToShow, setTodoToShow] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const onTodoTypeChange = (type: string) => {
    setTypeOfTodos(type);
  };

  const handleFilterChange = (query: string) => {
    setFilter(query);
  };

  const handleFilterClear = () => {
    setFilter('');
  };

  const onCloseButton = (todo: Todo | null) => {
    setTodoToShow(todo);
  };

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch {
      // eslint-disable-next-line
      console.log('Error occurred in App fetch')
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const groupedTodos = useMemo(() => {
    switch (typeOfTodos) {
      case TodosType.ACTIVE:
        return todos.filter(({ completed }) => (!completed));
      case TodosType.COMPLETED:
        return todos.filter(({ completed }) => (completed));
      default:
        return todos;
    }
  }, [todos, typeOfTodos]);

  const filteredTodos = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();

    return filter === ''
      ? groupedTodos
      : groupedTodos.filter(({ title }) => title.toLowerCase().includes(normalizedFilter));
  }, [groupedTodos, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                option={typeOfTodos}
                filter={filter}
                onTodoTypeChange={onTodoTypeChange}
                handleFilterChange={handleFilterChange}
                handleFilterClear={handleFilterClear}
              />
            </div>

            <div className="block">
              {
                isLoading && <Loader />
              }
              {
                !isLoading && (
                  <TodoList
                    todos={filteredTodos}
                    onCloseButton={onCloseButton}
                    todoToShow={todoToShow}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>
      {
        todoToShow && (
          <TodoModal todo={todoToShow} onCloseButton={onCloseButton} />
        )
      }
    </>
  );
};
