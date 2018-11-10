import React from 'react';
import {Route} from 'react-router-dom';

import TopicList from '';
import TopicDetail from '';

export default () => {
  <Route path="/" component={TopicList} exact={true} />,
  <Route path="/detail" component={TopicDetail} />
}
