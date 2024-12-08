import { Component } from '@angular/core';
import { WebcamService } from '../services/webcam.service';
import { DataService } from '../services/data.service';
import { OnInit, OnDestroy } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {  
  private intervalId: any;
  public timestamp = Date.now();

  constructor( public webcamService: WebcamService, public dataService: DataService, public geoLocation: GeolocationService )
   {
    this.startTimestampRefresh();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
   }
  
  ionViewDidEnter() {
    console.log("ViewDidEnter")
    this.refreshImage();
    
  }

  ionViewWillLeave() {    
  }

  ionViewDidLeave() {}  

  startTimestampRefresh() {
    this.intervalId = setInterval(() => {
      this.geoLocation.showToast("Auto image refresh")
      this.refreshImage();
    }, 1 * 60 * 1000); // 5 minutes in milliseconds
  }

  refreshImage() {
    this.timestamp = Date.now();
  }

}
