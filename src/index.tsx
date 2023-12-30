import ReactDOM from 'react-dom';
import { App } from './App';
import TodoContextProvider from './context/myContext';

ReactDOM.render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>,

  document.getElementById('root'),
);
