import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoFilter } from './components/TodoFilter';
import 'bulma/css/bulma.css';

enum SortType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [selectedTodo, setSelectedTodo] = useState<number>(0);
  const [filteredBy, setFilteredBy] = useState<string>(SortType.ALL);
  const [query, setQuery] = useState<string>('');
  const [selectedUser, isUserSelected] = useState<boolean>(false);

  useEffect(() => {
    const loadTodos = async () => {
      const todosFromServer = await getTodos();

      setLoading(true);
      setTodos(todosFromServer);
      setVisibleTodos(todosFromServer);
    };

    loadTodos();
    setLoading(false);
  }, []);

  const changeFilteredBy = (filterType: string) => {
    setFilteredBy(filterType);
  };

  const changeQuery = (input: string) => {
    setQuery(input);
  };

  const handleFilter = (title: string) => {
    return title.toLowerCase().includes(query.toLowerCase());
  };

  useEffect(() => {
    switch (filteredBy) {
      case SortType.ALL:
        setVisibleTodos(todos.filter(todo => handleFilter(todo.title)));
        break;

      case SortType.ACTIVE:
        setVisibleTodos(todos.filter(todo => !todo.completed
          && handleFilter(todo.title)));
        break;

      case SortType.COMPLETED:
        setVisibleTodos(todos.filter(todo => todo.completed
          && handleFilter(todo.title)));
        break;

      default:
        break;
    }
  }, [filteredBy, query]);

  const selectUser = (id: number, todoId: number) => {
    setUserId(id);
    isUserSelected(!selectedUser);
    setSelectedTodo(todoId);
  };

  const usersTodo = todos.find(todo => todo.id === selectedTodo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">

            {!loading ? <Loader /> : (
              <>
                <h1 className="title">{`Todos: ${filteredBy}`}</h1>

                <div className="block">
                  <TodoFilter
                    changeFilteredCondition={changeFilteredBy}
                    changeQuery={changeQuery}
                    query={query}
                  />
                </div>

                <div className="block">
                  <TodoList
                    todos={visibleTodos}
                    selectUser={selectUser}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {selectedUser && (
        <TodoModal
          todo={usersTodo}
          selectedUser={userId}
          selectUser={selectUser}
        />
      )}
    </>
  );
};

export default App;
