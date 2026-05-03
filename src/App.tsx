/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { FilterTodo } from './types/Filter';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [inputtedFilter, setInputtedFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterTodo>('all');

  const onCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  useEffect(() => {
    const getFilteredTodos = () => {
      const newTodos = [...todos];

      if (inputtedFilter && selectedFilter === 'all') {
        return setFilteredTodos(
          newTodos.filter(newTodo =>
            newTodo.title.toLowerCase().includes(inputtedFilter.toLowerCase()),
          ),
        );
      }

      switch (selectedFilter) {
        case 'active':
          const activeTodos = newTodos.filter(todo => !todo.completed);

          if (inputtedFilter) {
            return setFilteredTodos(
              activeTodos.filter(activeTodo =>
                activeTodo.title
                  .toLowerCase()
                  .includes(inputtedFilter.toLowerCase()),
              ),
            );
          }

          return setFilteredTodos(activeTodos);
        case 'completed':
          const completedTodos = newTodos.filter(todo => todo.completed);

          if (inputtedFilter) {
            return setFilteredTodos(
              completedTodos.filter(completedTodo =>
                completedTodo.title
                  .toLowerCase()
                  .includes(inputtedFilter.toLowerCase()),
              ),
            );
          }

          return setFilteredTodos(completedTodos);
        default:
          return setFilteredTodos(todos);
      }
    };

    getFilteredTodos();
  }, [selectedFilter, inputtedFilter, todos]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const todosData = await getTodos();

        setTodos(todosData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTodo !== null) {
      const fetchUser = async () => {
        try {
          const usersData = await getUser(selectedTodo.userId);

          setUser(usersData);
        } catch (error) {}
      };

      fetchUser();
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={setSelectedFilter}
                selectedFilter={selectedFilter}
                filteredValue={inputtedFilter}
                onSelectTodo={setInputtedFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal user={user} todo={selectedTodo} onClose={onCloseModal} />
      )}{' '}
    </>
  );
};
