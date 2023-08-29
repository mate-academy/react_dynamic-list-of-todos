import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import {
  StateContext,
  DispatchContext,
  ACTIONS,
  FILTER,
} from './components/ToDoContext';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const { visibleList, sortBy, searchValue } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [needLoader, setNeedLoader] = useState(false);

  const { selectedTodo } = useContext(StateContext);

  function filterTodos(todoslist: Todo[]): Todo[] {
    switch (sortBy) {
      case FILTER.ALL:
        return [...todoslist];
      case FILTER.COMPLITED:
        return [...todoslist.filter(todo => todo.completed)];
      case FILTER.ACTIVE:
        return [...todoslist.filter(todo => !todo.completed)];
      default:
        return todoslist;
    }
  }

  const getVisibleTodos = () => {
    if (searchValue.length > 0) {
      const temp = visibleList.filter(
        todo => todo.title.toLowerCase().includes(searchValue.toLowerCase()),
      );

      return filterTodos(temp);
    }

    return filterTodos(visibleList);
  };

  useEffect(() => {
    setNeedLoader(true);
    getTodos()
      .then(res => {
        dispatch({ type: ACTIONS.SET_LIST, payload: res });
        dispatch({ type: ACTIONS.SET_VISIBLE_LIST, payload: res });
      })
      .finally(() => setNeedLoader(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {/* <Loader /> */}
              {needLoader && (<Loader />)}
              <TodoList todos={getVisibleTodos()} />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo.id && (<TodoModal key={selectedTodo.id} />)}
    </>
  );
};
