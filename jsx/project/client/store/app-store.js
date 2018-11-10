import {
  observable,
  computed,
  action,
  autorun,
} from 'mobx';

class AppStore {
  @observable count = 0;

  @observable name = 'xuqinqin';

  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }

  @action add() {
    this.count += 1;
  }
}

const appState = new AppStore();

autorun(() => {
  console.log(appState.msg)
});

setTimeout(() => {
  appState.add();
}, 1000);

export default appState;
