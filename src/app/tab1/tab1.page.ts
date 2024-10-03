// src/app/tab1/tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  datasets: any[] = [];

  constructor(public dataService: DataService, private navCtrl: NavController) {}

  ngOnInit() {
  }

  getImageUrl(picture: string) {
    // return Filesystem.getUri({ path: `pictures/${picture}`, directory: Directory.Data });
  }

  viewImage(dataset: any) {
    // logic to view image fullscreen
    this.navCtrl.navigateForward(`/fullscreen/${dataset.picture}`);
  }
}

