import { TodoStatus } from '../enums/TodoStatus';

export const getTodoStatus = (type: string) => {
  switch (type) {
    case TodoStatus.Active:
      return TodoStatus.Active;

    case TodoStatus.Completed:
      return TodoStatus.Completed;

    case TodoStatus.All:
    default:
      return TodoStatus.All;
  }
};
