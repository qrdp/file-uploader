import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Urls} from "./urls";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
import {Observable} from "rxjs";
import {first} from "rxjs/operators";

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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getQrData();
  }

  private getQrData() {
    this.http.get(Urls.qrData('Тестовый документ № АМ-1-2/21')).subscribe((data: any) => {
      console.log(data);
      this.qrData = JSON.stringify(data);
      this.getFile(data.uuid)
        .pipe()
        .subscribe(
          message => console.log(message.data)
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

  private fileLoaded() {

  }
}
