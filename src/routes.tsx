import React, { FC, useEffect } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';

import { FAQ_PATH, HOME_PATH } from './constants';
import { HomePage } from './pages/Home';
import { FAQPage } from './pages/FAQ';
import { NordigenModule } from './modules/Nordingen';

const ScrollToTop = withRouter(({ history }) => {
  useEffect(() => {
    return history.listen(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  return null;
});

export const Routes: FC = () => (
  <BrowserRouter>
    <ScrollToTop/>
    <Route path={ HOME_PATH } exact component={ HomePage }/>
    <Route path={ HOME_PATH } component={ NordigenModule }/>
    <Route path={ FAQ_PATH } component={ FAQPage }/>
  </BrowserRouter>
);