# React dynamic list of TODOs

> See [the working page](https://mate-academy.github.io/react_dynamic-list-of-todos/)

You are given the markup for the `App`, `TodosList`, `TodoFilter`, `TodoModal`
and `Loader` components. Load data from the API and show it using the given components.

1. Load [the todos](https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json) when the `App` is
loaded and show them using `TodoList`;
2. Show the `Loader` when waiting any data from the server;
3. Use the `wait` function given in the `api.ts` to check if the `Loader`
works as expected;
4. When the `Show` button is clicked open the `TodoModal` with a selected `todo`;
5. Don't forget to load [user details](https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/1.json) (replace `1` with the actual `userId`);
6. Show the Loader while waiting for the user;
7. `x` button should close the modal;
8. The `select` should filter todos by the `completed` status: `all`, `completed` and `active`(not completed) todos;
9. Use the `input` in the `TodoFilter` to filter the `todos` by `title`;
    - show the `x` button when the `query` is entered;
    - the `x` button should clear the `query` and reset the todos;

    Вам предоставляется разметка для `App`, `TodosList`, `TodoFilter`, `TodoModal`
и компоненты «Загрузчик». Загрузить данные из API и показать их с помощью заданных компонентов.

1. Загрузите [todos](https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json), когда приложение
загружаются и показывают их с помощью `TodoList`;
2. Показывать `Loader` при ожидании каких-либо данных с сервера;
3. Используйте функцию `wait`, указанную в `api.ts`, чтобы проверить, работает ли `Loader`.
работает как положено;
4. Когда нажата кнопка «Показать», откройте «TodoModal» с выбранным «todo»;
5. Не забудьте загрузить [сведения о пользователе] (https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/1.json) (замените `1` фактическим ` идентификатор пользователя`);
6. Показывать загрузчик во время ожидания пользователя;
7. кнопка `x` должна закрыть модальное окно;
8. «Выбор» должен фильтровать задачи по статусу «завершено»: «все», «завершено» и «активно» (не завершено) задачи;
9. Используйте «ввод» в «TodoFilter», чтобы отфильтровать «todos» по «названию»;
    - показывать кнопку `x` при вводе `запроса`;
    - кнопка «x» должна очищать «запрос» и сбрасывать задачи;

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://pushkalov.github.io/react_dynamic-list-of-todos/) and add it to the PR description.
