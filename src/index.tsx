import ReactDOM from 'react-dom';
import { App } from './App';
import { GlobalPostsProvider } from './TodoContext';

ReactDOM.render(
  <GlobalPostsProvider>
    <App />
  </GlobalPostsProvider>,
  document.getElementById('root'),
);
