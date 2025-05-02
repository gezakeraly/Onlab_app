import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.less';

/**
 * The entry point of the application. Renders the App component into the root element.
 */
ReactDOM.render(
  <React.StrictMode>
    {/* Render the main application component */}
    <App />
  </React.StrictMode>,
  document.getElementById('app') // The root element where the app will be rendered
);