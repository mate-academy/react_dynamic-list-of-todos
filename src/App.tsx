import React, { useState } from 'react';
import './App.css';
import { DownloadTask } from './modules/DownloadTask';
import { fetchData } from './modules/fetchData';
import { RenderTaskList } from './modules/RenderTaskList';
import { Prepared, User, Task } from './modules/interfaces';

const App = () => {
  const [prepared, setPrepared] = useState<Prepared[]>([]);
  const [isDataDownloaded, setDataDownloaded] = useState(false);
  const [buttonText, setButtonText] = useState('Download tasks');

  async function getData() {
    const tasks = await fetchData<Task[]>('todos');
    const users = await fetchData<User[]>('users');

    setPrepared(
      tasks.map((task) => {
        return {
          ...task,
          user: users.find(person => person.id === task.userId),
        } as Prepared;
      }),
    );

    setDataDownloaded(true);
  }

  const sorting = (sortType: string) => {
    switch (sortType) {
      case 'title':
        return setPrepared(
          [...prepared
            .sort((a, b) => a.title.localeCompare(b.title)),
          ],
        );

      case 'completed':
        return setPrepared(
          [...prepared
            .sort((a, b) => {
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

        return setPrepared(
          [...prepared
            .sort((a, b) => a.user.name.localeCompare(b.user.name)),
          ],
        );

      default:
        return null;
    }
  };

  if (!isDataDownloaded) {
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

  if (isDataDownloaded) {
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
          prepared={prepared}
        />
      </>
    );
  }

  return null;
};

export default App;
