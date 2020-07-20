import React, { useState } from 'react';
import './App.css';
import { DownloadTask } from './modules/DownloadTask';
import { RenderTaskList } from './modules/RenderTaskList';

const tasksLink = 'https://mate.academy/students-api/todos';
const usersLink = 'https://mate.academy/students-api/users';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isDataDownloaded, setDataDownloaded] = useState(false);
  const [buttonText, setButtonText] = useState('Download tasks');

  function getTask(): Promise<void> {
    return Promise.all([
      fetch(tasksLink),
      fetch(usersLink),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        setTasks(data1.data);
        setUsers(data2.data);
        setDataDownloaded(true);
      })
      .catch(() => document.location.reload(true));
  }

  if (!isDataDownloaded) {
    return (
      <>
        <DownloadTask
          setButtonText={setButtonText}
          getTask={getTask}
          buttonText={buttonText}
        />
      </>
    );
  }

  if (isDataDownloaded) {
    return (
      <RenderTaskList
        tasks={tasks}
        users={users}
      />
    );
  }

  return null;
};

export default App;
