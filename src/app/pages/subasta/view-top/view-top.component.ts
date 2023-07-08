import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { pujaI } from 'src/app/shared/model/puja.interface';
import { SubaSvcService } from '../suba-svc.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-top',
  templateUrl: './view-top.component.html',
  styleUrls: ['./view-top.component.scss']
})
export class ViewTopComponent implements OnInit {
  lastPuja: Observable<pujaI | null>;
  paleta: Observable<string | null>;

  constructor(private subaSvc: SubaSvcService) { }

  ngOnInit(): void {
    this.getLastPuja();
  }

  getLastPuja(): void {
    this.lastPuja = this.subaSvc.getTopOnePuja();

    this.paleta = this.lastPuja.pipe(
      switchMap((puja: pujaI | null) => {
        if (puja) {
          return this.subaSvc.getUserById(puja.idUser).pipe(
            map((user: any) => user.paleta)
          );
        } else {
          return of(null);
        }
      })
    );
  }
}
