import React, { useState } from 'react';
import './App.css';
import { DownloadTask } from './modules/DownloadTask';
import { RenderTaskList } from './modules/RenderTaskList';
import { Prepared, User, Task } from './modules/interfaces';

const tasksLink = 'https://mate.academy/students-api/todos';
const usersLink = 'https://mate.academy/students-api/users';

const App = () => {
  const [prepared, setPrepared] = useState<any>();
  const [isDataDownloaded, setDataDownloaded] = useState(false);
  const [buttonText, setButtonText] = useState('Download tasks');

  async function fetchData<T>(url: string): Promise<T> {
    const data = await fetch(url);
    const response = await data.json();

    return response.data;
  }

  async function getData() {
    const tasks = await fetchData<Task[]>(tasksLink);
    const users = await fetchData<User[]>(usersLink);

    console.log("getData -> tasks", tasks)
    console.log("getData -> users", users)

    setPrepared(
      tasks.map((task) => {
        return {
          ...task,
          user: users.find(person => person.id === task.userId),
        };
      }),
    );

    // setPrepared(
    //   tasks.map(task => {
    //     return {
    //       ...task,
    //       user: users.find(person => person.id === task.userId),
    //     };
    //   }),
    // );
    setDataDownloaded(true);
  }

  console.log("App -> prepared", prepared)

  const sorting = (sortType: string) => {
    switch (sortType) {
      case 'title':
        return setPrepared(
          [...(prepared as Prepared[])
            .sort((a, b) => a.title.localeCompare(b.title)),
          ],
        );

      case 'completed':
        return setPrepared(
          [...(prepared as Prepared[])
            .sort((a, b) => {
              if (a.completed === true && b.completed === false) {
                return -1;
              }

              if (b.completed === true && a.completed === false) {
                return 1;
              }

              return 0;
            }),
          ]
        );

      case 'userName':

        return setPrepared(
          [...(prepared as Prepared[])
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
          onClick={
            () => {
              sorting('title');
            }
          }
        >
          By title
        </button>

        <button
          type="button"
          onClick={
            () => {
              sorting('completed');
            }
          }
        >
          By completed
        </button>

        <button
          type="button"
          onClick={
            () => {
              sorting('userName');
            }
          }
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
