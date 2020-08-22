import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SiteContextContainer from './Context/siteContext';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss';

ReactDOM.render(
  <BrowserRouter>
    <SiteContextContainer>
      <App />
    </SiteContextContainer>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
