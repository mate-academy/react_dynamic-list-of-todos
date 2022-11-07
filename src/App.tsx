import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/FilterType';

const filteredTodos = (
  query: string,
  todos: Todo[],
  filterType: FilterType,
) => {
  const propLower = (prop: string) => prop.toLocaleLowerCase();

  const visibleTodos = todos.filter(todo => (
    propLower(todo.title).includes(propLower(query))
  ));

  switch (filterType) {
    case FilterType.ACTIVE:
      return visibleTodos.filter(todo => !todo.completed);

    case FilterType.COMPLETED:
      return visibleTodos.filter(todo => todo.completed);

    default:
      return visibleTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [isLoadedTodos, setIsLoadedTodos] = useState(false);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.ALL);

  const getTodo = (todoId: number) => {
    return todos.find(todo => todo.id === todoId) || todos[0];
  };

  const todoList = filteredTodos(query, todos, filterBy);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
        setIsLoadedTodos(true);
      } catch (error) {
        throw new Error('Error of loading todos!');
      }
    };

    fetchTodos();
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
                setQuery={setQuery}
                filterType={filterBy}
                setFilterType={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoadedTodos
                ? (
                  <TodoList
                    todos={todoList}
                    selectedTodoId={selectedTodoId}
                    setSelectedTodoId={setSelectedTodoId}
                    setIsLoadedUser={setIsLoadedUser}
                  />
                ) : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal
          selectedTodo={getTodo(selectedTodoId)}
          setSelectedTodo={setSelectedTodoId}
          isLoadedUser={isLoadedUser}
          setIsLoadedUser={setIsLoadedUser}
        />
      )}
    </>
  );
};
