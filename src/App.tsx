import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState<string>(SortType.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isUserSelected, setIsUserSelected] = useState(false);

  const loadTodos = async () => {
    const todosFromServer: Todo[] = await getTodos();

    setIsLoading(true);
    setTodos(todosFromServer);
    setVisibleTodos(todosFromServer);
  };

  useEffect(() => {
    loadTodos();
    setIsLoading(false);
  }, []);

  const changeSortType = (newSortType: string) => {
    setSortType(newSortType);
  };

  const changeQuery = (input: string) => {
    setQuery(input);
  };

  const handleFilter = (title: string) => {
    return title.toLowerCase().includes(query.toLowerCase());
  };

  useEffect(() => {
    switch (sortType) {
      case SortType.ALL:
        setVisibleTodos(todos.filter(todo => (
          handleFilter(todo.title)
        )));
        break;

      case SortType.ACTIVE:
        setVisibleTodos(todos.filter(todo => (
          !todo.completed && handleFilter(todo.title)
        )));
        break;

      case SortType.COMPLETED:
        setVisibleTodos(todos.filter(todo => (
          todo.completed && handleFilter(todo.title)
        )));
        break;

      default:
        break;
    }
  }, [sortType, query]);

  const selectUser = (userId: number, todoId: number) => {
    const newSelectedTodo = todos.find(todo => todo.id === todoId);

    if (newSelectedTodo) {
      setSelectedTodo(newSelectedTodo);
    }

    setSelectedUserId(userId);
    setIsUserSelected(!isUserSelected);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">
                  {`${sortType} todos:`}
                </h1>

                <div className="block">
                  <TodoFilter
                    query={query}
                    onChangeQuery={changeQuery}
                    onChangeSortType={changeSortType}
                  />
                </div>

                <div className="block">
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelectUser={selectUser}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {selectedUserId && (
        <TodoModal
          todo={selectedTodo}
          selectedUserId={selectedUserId}
          onSelectUser={selectUser}
        />
      )}
    </>
  );
};
