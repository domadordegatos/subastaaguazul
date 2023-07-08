import { Component, OnInit } from '@angular/core';
import { SubaSvcService } from '../suba-svc.service';
import { liveI } from 'src/app/shared/model/live.interface';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  liveData: liveI;
  constructor(private subaSvc:SubaSvcService) { }

  ngOnInit(): void {
  this.subaSvc.getLiveById().subscribe((data) => { this.liveData = data });
  }

}
