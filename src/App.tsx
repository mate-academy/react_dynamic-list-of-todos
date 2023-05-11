/* eslint-disable max-len */
import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState('All');
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  const loadTodosFromApi = useCallback(async () => {
    const todos = await getTodos();

    setVisibleTodos(todos);
  }, []);

  const changeQuery = useCallback((str: string) => {
    setQuery(str);
  }, []);

  const changeOption = useCallback((option: string) => {
    setSelectedOption(option);
  }, []);

  const filterTodosByRequirments = (str: string, option: string) => {
    let todos = visibleTodos;

    // eslint-disable-next-line default-case
    switch (option) {
      case 'completed':
        todos = visibleTodos.filter(({ completed }) => completed);
        break;
      case 'active':
        todos = visibleTodos.filter(({ completed }) => !completed);
        break;
    }

    return todos.filter(({ title }) => title.toLowerCase().includes(str.toLowerCase()));
  };

  const chooseTodo = (todo: Todo) => {
    setCurrentTodo(todo);
  };

  const clearTodo = () => {
    setCurrentTodo(null);
  };

  const filteredTodos = filterTodosByRequirments(query, selectedOption);

  useEffect(() => {
    loadTodosFromApi();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeQuery={changeQuery}
                changeOption={changeOption}
                selectedOption={selectedOption}
                query={query}
              />
            </div>

            <div className="block">
              {/* <Loader /> */}
              {(filteredTodos.length === 0 && query === '')
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    chooseTodo={chooseTodo}
                    currentTodo={currentTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {
        currentTodo && <TodoModal todo={currentTodo} clearTodo={clearTodo} />
      }
    </>
  );
};
