import ReactDOM from 'react-dom';
import { App } from './App';
import { SelectedTodoProvider } from './States/SelectedTodoState';

ReactDOM.render(
  (
    <SelectedTodoProvider>
      <App />
    </SelectedTodoProvider>
  ),
  document.getElementById('root'),
);
