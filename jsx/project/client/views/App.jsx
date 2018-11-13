import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import { AppStore } from '../store/app-store';

// stores是app.js中Provider组件注入的属性
@inject(stores => ({
  appStore: stores.appStore,
})) @observer
class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidCatch(error, info) {
    console.error(error); // eslint-disable-line
    console.log(info); // eslint-disable-line
  }

  render() {
    const { appStore } = this.props;
    return (
      <div>
        {`this app is ${appStore.appMsg}`}
      </div>
    );
  }
}

App.wrappedComponent.propTypes = {
  appStore: PropTypes.instanceOf(AppStore),
};

App.propTypes = {};

export default App;
