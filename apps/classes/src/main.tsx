import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './app/app';
// import App2 from './app/app2';
import store from './app/store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      {/* class implementation */}
      <App />
      {/* function implementation */}
      {/* <App2 /> */}
    </Provider>
  </StrictMode>
);
