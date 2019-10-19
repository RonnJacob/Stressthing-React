import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import WhatsCooking from "./components/WhatsCooking";

ReactDOM.render(

    <WhatsCooking/>, document.getElementById('root'));

serviceWorker.unregister();
