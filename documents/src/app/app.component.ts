import {Component, NgZone, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Urls} from "./urls";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';

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
  es?: EventSource;

  constructor(private http: HttpClient, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.getQrData();
  }

  private getQrData() {
    this.http.get(Urls.qrData(this.info)).subscribe((data: any) => {
      console.log(data);
      this.qrData = JSON.stringify(data);
      this.getFile(data.uuid);
    });
  }

  private getFile(uuid: any) {
    if (this.es) {
      this.es.close();
    }
    setTimeout(() => {
      this.getFile(uuid);
    }, 25 * 1000)

    this.es = new EventSource(Urls.fileData(uuid));
    this.es.onmessage = (data: any) => {
      this.fileLoaded(JSON.parse(data.data))
    }

    this.es.onerror = () => {
      this.es?.close();
    }
  }

  private fileLoaded(data: any) {
    this.ngZone.run(() => {
      this.imgContent = data.content;
    })
  }
}
