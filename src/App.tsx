/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FiterTodo } from './types/FilterTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>(FiterTodo.ALL);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedTodo = useMemo(() => {
    return todos.find(({ id }) => id === selectedTodoId) || null;
  }, [todos, selectedTodoId]);

  const closeModalWindow = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const handleSelectFilter = useCallback((value: string) => {
    setSelectedFilter(value);
  }, []);

  const handleQuery = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleSelectTodo = useCallback((value: number) => {
    setSelectedTodoId(value);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todo = await getTodos();

        setTodos(todo);
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    };

    fetchData();
  }, []);

  const visibleTodos = useMemo(() => {
    switch (selectedFilter) {
      case FiterTodo.ALL:
        return todos.filter(({ title }) => title.toLowerCase().includes(searchQuery.toLowerCase()));

      case FiterTodo.ACTIVE:
        return todos.filter(
          (todo) => !todo.completed && todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      case FiterTodo.COMPLETED:
        return todos.filter(
          (todo) => todo.completed && todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      default:
        return [];
    }
  }, [todos, selectedFilter, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={handleSelectFilter}
                searchQuery={searchQuery}
                onChange={handleQuery}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodoId}
                onTodoSelection={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={closeModalWindow}
        />
      )}
    </>
  );
};
