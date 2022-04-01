import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodo } from './api/api';
import { StatusQuery } from './StatusQuery';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tasksStatusFilter, setTasksStatusFilter] = useState(StatusQuery.all);

  useEffect(() => {
    const query = tasksStatusFilter !== StatusQuery.all
      ? `completed=${tasksStatusFilter}`
      : '';

    getTodo(query)
      .then(data => setTodos(data));
  }, [tasksStatusFilter]);

  const onSelectUser = useCallback((userId: number) => () => setSelectedUserId(userId), []);
  const onSelectStatus = useCallback((status: StatusQuery) => setTasksStatusFilter(status), []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          onSelectUser={onSelectUser}
          selectedUserId={selectedUserId}
          onSelectStatus={onSelectStatus}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser userId={selectedUserId} onClear={onSelectUser(0)} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default memo(App);
