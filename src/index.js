import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import StressThing from "./components/StressThing";

ReactDOM.render(

    <StressThing/>, document.getElementById('root'));

serviceWorker.unregister();
