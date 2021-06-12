import {environment} from '../environments/environment';

export class Urls {
  public static readonly uploadFile = (): string => `${environment.host}/api/upload`;
}
