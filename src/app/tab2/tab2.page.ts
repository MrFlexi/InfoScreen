import { Component } from '@angular/core';
import { WebcamService } from '../services/webcam.service';
import { DataService } from '../services/data.service';
import { OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {  
  constructor( public webcamService: WebcamService, public dataService: DataService ) {

  }
  ngOnInit() { }

  ngOnDestroy() { }
  
  ionViewDidEnter() {
    // Initialize Leaflet Map  
  }

  ionViewWillLeave() {    
  }

  ionViewDidLeave() {}  

}
