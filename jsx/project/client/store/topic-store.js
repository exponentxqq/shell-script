import {extendObservable, observable, action, toJS} from 'mobx';
import topicModel from '../model/topic-model';
import { get } from '../util/http'

class Topic {
  constructor(data) {
    extendObservable(this, data);
  }

  @observable syncing = false;
}

const createTopic = (topic) => {
  return Object.assign({}, topicModel, topic);
};

export default class TopicStore {
  @observable topics;

  @observable syncing;

  constructor({ syncing, topics } = { syncing: false, topics: [] }) {
    this.syncing = syncing;
    this.topics = topics.map(topic => new Topic(createTopic(topic)));
  }

  @action fetchTopics() {
    return new Promise((resolve, reject) => {
      this.syncing = true;
      get('/topics', {
        mdrender: false,
      }).then(resp => {
        if (resp.success) {
          resp.data.forEach(topic => {
            this.addTopic(topic);
          });
          this.syncing = false;
          resolve();
        } else {
          reject();
        }
      })
        .catch(err => {
          reject(err);
          this.syncing = false;
        })
    })
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)));
  }

  toJson() {
    return {
      topics: toJS(this.topics)
    }
  }
}

