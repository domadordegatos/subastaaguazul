import { Component, OnInit } from '@angular/core';
import { liveI } from 'src/app/shared/model/live.interface';
import { SubaSvcService } from '../suba-svc.service';

@Component({
  selector: 'app-unautorized',
  templateUrl: './unautorized.component.html',
  styleUrls: ['./unautorized.component.scss']
})
export class UnautorizedComponent implements OnInit {
  liveData: liveI;
  constructor(private subaSvc:SubaSvcService) { }

  ngOnInit(): void {
    this.subaSvc.getLiveById().subscribe((data) => { this.liveData = data });
  }

}
