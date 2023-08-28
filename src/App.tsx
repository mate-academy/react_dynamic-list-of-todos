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

  const newList = () => {
    let copyVisibleList: Todo[] = [] as Todo[];

    if (searchValue.length === 0 && sortBy === FILTER.ALL) {
      copyVisibleList = [...visibleList];
    }

    if (searchValue.length === 0 && sortBy === FILTER.COMPLITED) {
      copyVisibleList = [...visibleList.filter(todo => todo.completed)];
    }

    if (searchValue.length === 0 && sortBy === FILTER.ACTIVE) {
      copyVisibleList = [...visibleList.filter(todo => !todo.completed)];
    }

    if (searchValue.length > 0 && sortBy === FILTER.ALL) {
      copyVisibleList = [...visibleList.filter(
        todo => todo.title.includes(searchValue),
      )];
    }

    if (searchValue.length > 0 && sortBy === FILTER.COMPLITED) {
      const shallowCopy = [...visibleList.filter(todo => todo.completed)];

      copyVisibleList = shallowCopy.filter(
        todo => todo.title.includes(searchValue),
      );
    }

    if (searchValue.length > 0 && sortBy === FILTER.ACTIVE) {
      const shallowCopy = [...visibleList.filter(todo => !todo.completed)];

      copyVisibleList = shallowCopy.filter(
        todo => todo.title.includes(searchValue),
      );
    }

    return copyVisibleList;
  };

  useEffect(() => {
    setNeedLoader(true);
    getTodos()
      .then(res => {
        dispatch({ type: ACTIONS.SET_LIST, payload: res });
        dispatch({ type: ACTIONS.SET_VISIBLE_LIST, payload: res });
      })
      .catch((err) => {
        throw err;
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
              <TodoList list={newList()} />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo.id && (<TodoModal />)}
    </>
  );
};
