import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dummyioDataProvider from './dummyioDataProvider';

ReactDOM.render(
    <React.StrictMode>
        <App dataProvider={dummyioDataProvider} />
    </React.StrictMode>,
    document.getElementById('root')
);
