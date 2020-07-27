import React, { useState } from 'react';
import './App.css';
import { DownloadTask } from './modules/DownloadTask';
import { fetchData } from './modules/fetchData';
import { RenderTaskList } from './modules/RenderTaskList';
import { PreparedTasks, User, Task } from './modules/interfaces';

const App = () => {
  const [preparedTasks, setPreparedTasks] = useState<PreparedTasks[]>([]);
  const [isLoaded, setLoaded] = useState(false);
  const [buttonText, setButtonText] = useState('Download tasks');

  async function getData() {
    const tasks = await fetchData<Task[]>('todos');
    const users = await fetchData<User[]>('users');

    setPreparedTasks(
      tasks.map(task => ({
        ...task,
        user: users.find(person => person.id === task.userId),
      }) as PreparedTasks),
    );

    setLoaded(true);
  }

  const sorting = (sortType: string) => {
    switch (sortType) {
      case 'title':
        return setPreparedTasks(
          [...preparedTasks.sort((a, b) => a.title.localeCompare(b.title)),
          ],
        );

      case 'completed':
        return setPreparedTasks(
          [...preparedTasks.sort((a, b) => {
            if (a.completed === true && b.completed === false) {
              return -1;
            }

            if (b.completed === true && a.completed === false) {
              return 1;
            }

            return 0;
          }),
          ],
        );

      case 'userName':

        return setPreparedTasks(
          [...preparedTasks.sort((a, b) => a.user.name.localeCompare(b.user.name))],
        );

      default:
        return null;
    }
  };

  if (!isLoaded) {
    return (
      <>
        <DownloadTask
          setButtonText={setButtonText}
          getData={getData}
          buttonText={buttonText}
        />
      </>
    );
  }

  if (isLoaded) {
    return (
      <>
        <button
          type="button"
          onClick={() => sorting('title')}
        >
          By title
        </button>

        <button
          type="button"
          onClick={() => sorting('completed')}
        >
          By completed
        </button>

        <button
          type="button"
          onClick={() => sorting('userName')}
        >
          By User Name
        </button>

        <RenderTaskList
          preparedTasks={preparedTasks}
        />
      </>
    );
  }

  return null;
};

export default App;
