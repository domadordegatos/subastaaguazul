import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubaSvcService } from 'src/app/pages/subasta/suba-svc.service';
import { liveI } from '../../model/live.interface';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styles: [
  ]
})
export class BannerComponent implements OnInit {
  liveData: liveI;
  constructor(private subaSvc:SubaSvcService) { }

  ngOnInit(): void {
    this.subaSvc.getLiveById().subscribe((data) => { this.liveData = data });
  }

}
