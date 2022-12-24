import React from 'react';
import { render } from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { App } from './app';


render(<App />, document.getElementById('root'));

serviceWorkerRegistration.register();
