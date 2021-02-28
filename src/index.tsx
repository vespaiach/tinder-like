import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dummyDataProvider from './dummyDataProvider';

ReactDOM.render(
    <React.StrictMode>
        <App dataProvider={dummyDataProvider} />
    </React.StrictMode>,
    document.getElementById('root')
);
