import { __DEV__ } from './config';

class Logger {
  public log(...args: any[]) {
    if (__DEV__) {
      console.log(...args);
    }
  }
}

const instance = new Logger();

export default instance;
