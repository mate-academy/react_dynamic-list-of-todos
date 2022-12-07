import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { debounce } from 'lodash';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const initialTodos = [] as Todo[];
  const initialTodo = {} as Todo;
  const [filterBy, setFilterBy] = useState('all');
  const [todos, setTodos] = useState(initialTodos);
  const [value, setValue] = useState('');
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(initialTodo);
  const [search, setSearch] = useState('');
  const applySearch = useCallback(
    debounce(setSearch, 500),
    [],
  );
  const [isVisibleLoader, setIsVisibleLoader] = useState(true);

  useEffect(() => {
    getTodos()
      .then(response => setTodos(response))
      .then(() => setIsVisibleLoader(false));
  }, []);

  let visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case 'all':
        return true;
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return false;
    }
  });

  useMemo(() => {
    visibleTodos = visibleTodos
      .filter(todo => todo.title
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()));
  }, [search]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterBy={setFilterBy}
                filterBy={filterBy}
                setValue={setValue}
                applySearch={applySearch}
                value={value}
              />
            </div>

            <div className="block">
              {isVisibleLoader && (<Loader />)}
              {todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  setShowTodoModal={setShowTodoModal}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showTodoModal && (
        <TodoModal
          selectedTodo={selectedTodo}
          initialTodo={initialTodo}
          setSelectedTodo={setSelectedTodo}
          setShowTodoModal={setShowTodoModal}
        />
      )}
    </>
  );
};
