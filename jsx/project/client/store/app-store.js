import {
  observable,
  computed,
  action,
  autorun,
} from 'mobx';

export class AppStore {
  @observable appName = 'exp-blog';

  @observable author = 'exp';

  @computed get appMsg() {
    return `app_name: ${this.appName}, author: ${this.author}`
  }

  @action changeAuthor(name) {
    this.author = name;
  }
}

const appStore = new AppStore();

autorun(() => {
  console.log(appStore.msg)
});

export default appStore;
