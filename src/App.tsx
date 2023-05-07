import React, { useState, useEffect, ChangeEvent } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { User } from './types/User';

const handleTodosPrepare = (
  todos: Todo[],
  filterType: string,
  query: string,
) => {
  const filteredTodos = todos.filter(todo => {
    switch (filterType) {
      case FilterType.ACTIVE:
        return !todo.completed;

      case FilterType.COMPLETED:
        return todo.completed;

      default:
        return todo;
    }
  });

  if (query.trim().length > 0) {
    const queriedTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase().trim())
    ));

    return queriedTodos;
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedTodoUser, setSelectedTodoUser] = useState<User | null>(null);

  const preparedTodos = handleTodosPrepare(todos, filterType, query);

  useEffect(() => {
    const fetchData = async () => {
      const todoList = await getTodos();

      setTodos(todoList);
    };

    fetchData();
  }, [preparedTodos]);

  useEffect(() => {
    if (selectedTodo) {
      const { userId } = selectedTodo;

      const fetchData = async () => {
        const user = await getUser(userId);

        setSelectedTodoUser(user);
      };

      fetchData();
    }
  }, [selectedTodo]);

  const handleFilterSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQueryReset = () => {
    setQuery('');
  };

  const handleTodoSelect = (todoId: number) => {
    const newSelectedTodo = todos.find(todo => todo.id === todoId) || null;

    setSelectedTodo(newSelectedTodo);
  };

  const handleTodoReset = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterSelect}
                query={query}
                onQueryChange={handleQueryChange}
                onQueryReset={handleQueryReset}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={preparedTodos}
                    selectedTodo={selectedTodo}
                    onTodoSelection={handleTodoSelect}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            todo={selectedTodo}
            selectedTodoUser={selectedTodoUser}
            onTodoReset={handleTodoReset}
          />
        )}
    </>
  );
};
