import {Component, NgZone, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Urls} from "./urls";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'document-system';
  elementType = NgxQrcodeElementTypes.IMG;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.LOW;
  qrData = '';
  info = `Тестовый документ № АМ-1-${Math.floor(Math.random() * 225) + 1}/21`;
  imgContent: any = 'assets/no-image.png';

  constructor(private http: HttpClient, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.getQrData();
  }

  private getQrData() {
    this.http.get(Urls.qrData(this.info)).subscribe((data: any) => {
      console.log(data);
      this.qrData = JSON.stringify(data);
      this.getFile(data.uuid)
        .pipe()
        .subscribe(
          message => this.fileLoaded(JSON.parse(message.data))
        );
    });
  }

  private getFile(uuid: string): Observable<any> {
    return new Observable(obs => {
      const es = new EventSource(Urls.fileData(uuid));
      es.onmessage = data => {
        obs.next(data)
      }
      return () => es.close();
    });
  }

  private fileLoaded(data: any) {
    this.ngZone.run(() => {
      this.imgContent = 'data:image/jpg;base64,' + data.content;
    })
  }
}
