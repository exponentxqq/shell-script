import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
// 热更新，更改client内容，浏览器无需刷新即可生效
import { AppContainer } from 'react-hot-loader';    // eslint-disable-line
import App from './views/App';

import appStore from './store/app-store';

const root = document.getElementById('root');
const render = (Component) => {
  const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate;
  renderMethod(
    <AppContainer>
      {/* 这里传递的state，可以在组件中使用 */}
      <Provider appStore={appStore}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default; // eslint-disable-line
    render(NextApp);
  });
}
