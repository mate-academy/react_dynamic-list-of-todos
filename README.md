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

## Instructions
- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://YoNiga7.github.io/react_dynamic-list-of-todos/) and add it to the PR description.
