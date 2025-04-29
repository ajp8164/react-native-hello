import type { HelloConfig as HelloConfigObj } from '@react-native-hello/common';
import lodash from 'lodash';
import { init as initLog } from './logger';

class HelloConfig<HelloConfigObj> {
  variables;

  public constructor() {
    this.variables = <HelloConfigObj>{};
  }

  /**
   * Gets a specific configuration item.
   * @param name the name of the configuration items
   * @returns the value of the configuration item
   */
  public get<T>(name: keyof HelloConfigObj) {
    return <T>(<unknown>this.variables[name]);
  }

  /**
   * Initialize with a configuration.
   * @param config - configuration key/value pairs
   */
  public init(config: HelloConfigObj) {
    lodash.assign(this.variables, config);
    // @ts-ignore
    initLog(config.userId);
  }

  /**
   * Set a configuration item.
   * @param config - configuration key/value pairs
   */
  public set(config: HelloConfigObj) {
    lodash.merge(this.variables, config);
  }
}

const config = new HelloConfig<HelloConfigObj>();
export { config };
