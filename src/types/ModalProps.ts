import { Todo } from './Todo';

export interface Properties {
  todo: Todo,
  handleOnClose: () => void,
}
