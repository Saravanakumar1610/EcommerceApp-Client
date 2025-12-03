import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
ReactDOM.render(React.createElement(BrowserRouter, null,
    React.createElement(App, null)), document.getElementById('root'));
