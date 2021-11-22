# React dynamic list of TODOs
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://misharosa.github.io/react_dynamic-list-of-todos/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)
- Use [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript)

## Description
You are given a basic markup for the App, TodosList and CurrentUser components and [the API](https://mate-academy.github.io/fe-students-api/).

Add the data loading, so the App works as described below:

1. Create a separate file `api.ts` to put all the API call there.
1. Todos are fetched on page load from [GET todos endpoint](https://mate.academy/students-api/todos). (Use `componentDidMount`)
1. Each todo has a button to select a user but `selectedUserId` is stored in the `App`. (pass a callback to the `TodoList`)
1. `CurrentUser` component receives `userId` as a prop and loads user details from [GET user endpoint](https://mate.academy/students-api/users/1) (replace 1 with a given `userId`).
1. If I select another user the details should be updated. (use `componentDidUpdate`).
1. If I select the same user there should not be a request to the server.
1. Add a button `Clear` into the `CurrentUser` to clear the selectedUser in the `App`
1. Add an `<input>` to the `TodoList` to filter the todos by title
1. Add a `<select>` to the `TodoList` to show `all`, `active`(not completed) or `completed` todos.
1. (*) Add `Randomize` button to the `TodoList` to show the todos in a random order.


## Опис
Вам надається базова розмітка для компонентів App, TodosList і CurrentUser і [API](https://mate-academy.github.io/fe-students-api/).

Додайте завантаження даних, щоб програма працювала, як описано нижче:

1. Створіть окремий файл `api.ts`, щоб помістити туди всі виклики API.
1. Завдання отримуються під час завантаження сторінки з [GET todos endpoint](https://mate.academy/students-api/todos). (Використовуйте `componentDidMount`)
1. Кожне завдання має кнопку для вибору користувача, але `selectedUserId` зберігається в `App`. (передати зворотний виклик до `TodoList`)
1. Компонент `CurrentUser` отримує `userId` як параметр і завантажує дані користувача з [GET кінцевої точки користувача](https://mate.academy/students-api/users/1) (замінити 1 заданим `userId`) .
1. Якщо я виберу іншого користувача, дані повинні бути оновлені. (використовуйте `componentDidUpdate`).
1. Якщо я вибираю того самого користувача, запит до сервера не має бути.
1. Додайте кнопку «Очистити» у «CurrentUser», щоб очистити вибраного користувача в «Додатку».
1. Додайте "<input>" до "TodoList", щоб відфільтрувати завдання за назвою
1. Додайте "<select>" до "TodoList", щоб показати "всі", "активні" (не завершені) або "завершені" завдання.
1. (*) Додайте кнопку `Randomize` до `TodoList`, щоб відображати завдання у випадковому порядку.
