import {environment} from '../environments/environment';

export class Urls {
  public static readonly qrData = (info: string): string =>
    `${environment.host}/api/qr-data?info=${info}`;
}
