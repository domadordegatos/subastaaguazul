import { Component, OnInit } from '@angular/core';
import { SubaSvcService } from '../suba-svc.service';
import { Observable, Subscription } from 'rxjs';
import { pujaI } from 'src/app/shared/model/puja.interface';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  historial:Observable<pujaI[]>

  constructor(private subaSvc:SubaSvcService) {
    this.historial = this.subaSvc.initializeHistoryPujasCollection();
   }

  ngOnInit(): void {

  }

}
