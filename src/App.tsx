/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import lodash, { shuffle } from 'lodash';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [query, setQuery] = useState('');
  const [filtredTodo, setFiltredTodo] = useState<Todo[]>([]);
  const [dataIsLoading, setdataIsLoading] = useState(true);
  const [targetValue, setTargetValue] = useState('all');
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = useCallback(
    lodash.debounce(setAppliedQuery, 1000), [],
  );

  const selectTodo = (todo: Todo):void => {
    setSelectedTodo(todo);
  };

  const handleQuery = (input: string) => {
    setQuery(input);
  };

  const handleTarget = (target: string) => {
    setTargetValue(target);
  };

  const filterForTodos = (target: string) => {
    switch (target) {
      case 'active':
        setFiltredTodo(todos.filter(todo => !todo.completed));
        break;

      case 'completed':
        setFiltredTodo(todos.filter(todo => todo.completed));
        break;

      default:
        setFiltredTodo(todos);
        break;
    }

    setFiltredTodo(prevState => {
      return prevState.filter(todo => todo.title.includes(appliedQuery));
    });
  };

  useEffect(() => {
    const loadTodos = async () => {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      filterForTodos(targetValue);
      setdataIsLoading(false);
    };

    loadTodos();
  }, []);

  useEffect(() => {
    filterForTodos(targetValue);
  }, [todos, appliedQuery, targetValue]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <div className="is-flex is-justify-content-space-between">
              <h1 className="title">Todos:</h1>
              <button
                className="button is-black"
                type="button"
                onClick={() => {
                  setFiltredTodo(prevState => shuffle(prevState));
                }}
              >
                Shake
              </button>
            </div>

            <div className="block">
              <TodoFilter
                handleQuery={handleQuery}
                query={query}
                handleTarget={handleTarget}
                applyQuery={applyQuery}

              />
            </div>

            <div className="block">
              { dataIsLoading
                ? (
                  <Loader />

                )
                : (
                  <TodoList
                    todos={filtredTodo}
                    selectTodo={selectTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectTodo={selectTodo}
        />
      )}
    </>
  );
};

export default App;
