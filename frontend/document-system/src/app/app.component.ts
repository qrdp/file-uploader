import {Component, OnInit} from '@angular/core';
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
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'Techiediaries';
  private qrData: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getQrData();
  }

  private getQrData() {
    this.http.get(Urls.qrData('Тестовый документ № АМ-1-2/21')).subscribe(data => {
      console.log(data);
      this.qrData = data;
    });
  }
}
