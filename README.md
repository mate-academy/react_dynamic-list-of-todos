# React dynamic list of TODOs

The goal of this task is to teach you:
- how to work with a not detailed task description;
- to learn the existing code before you start;
- to understand tests and why they fail;
- to try the working page and implement the same behaviour;

> Here is [the working page](https://mate-academy.github.io/react_dynamic-list-of-todos/)

You are given the markup for the `App`, `TodosList`, `TodoFilter`, `TodoModal`
and `Loader` components. Load data from the API and show it using the given components.

1. Load [the todos](https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json) when the `App` is
loaded and show them using `TodoList` (check the code in the `api.ts`);
1. Show the `Loader` when waiting any data from the server (check the `components` folder);
1. Check how the `wait` function is used in the `api.ts` to ensure that `Loader` works as expected;
1. When the `Show` button is clicked open the `TodoModal` with a selected `todo`;
1. Don't forget to load [user details](https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/1.json) (replace `1` with the actual `userId`);
1. Show the Loader while waiting for the user;
1. `x` button should close the modal;
1. The `select` should filter todos by the `completed` status: `all`, `completed` and `active`(not completed) todos;
1. Use the `input` in the `TodoFilter` to filter the `todos` by `title`;
    - show the `x` button when the `query` is entered;
    - the `x` button should clear the `query` and reset the todos;

Мета цього завдання — навчити вас:
- як працювати з не детальним описом завдання;
- вивчити існуючий код перед початком;
- зрозуміти тести та причини їх невдачі;
- спробувати робочу сторінку та реалізувати таку ж поведінку;

> Ось [робоча сторінка](https://mate-academy.github.io/react_dynamic-list-of-todos/)

Вам надано розмітку для компонентів `App`, `TodosList`, `TodoFilter`, `TodoModal`
та `Loader`. Завантажте дані з API та відобразіть їх за допомогою заданих компонентів.

1. Завантажте [todos](https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json) після завантаження `App` та відобразіть їх за допомогою `TodoList` (перевірте код у `api.ts`);
1. Показувати `Loader` під час очікування будь-яких даних від сервера (перевірте папку `components`);

1. Перевірте, як функція `wait` використовується в `api.ts`, щоб переконатися, що `Loader` працює належним чином;

1. При натисканні кнопки `Show` відкривати `TodoModal` з вибраним `todo`;

1. Не забудьте завантажити [дані користувача](https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/1.json) (замініть `1` на фактичний `userId`);

1. Показувати Loader під час очікування користувача;

1. Кнопка `x` повинна закривати модальне вікно;

1. `select` повинна фільтрувати todo за статусом `completed`: `all`, `completed` та `active`(не завершено) todos;
1. Використайте `input` у `TodoFilter` для фільтрації `todos` за `title`;
- показувати кнопку `x` при введенні `query`;
- кнопка `x` повинна очистити `query` та скинути список todos;




## Instructions
- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://NemH.github.io/react_dynamic-list-of-todos/) and add it to the PR description.
